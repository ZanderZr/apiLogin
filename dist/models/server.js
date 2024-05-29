"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const producto_1 = __importDefault(require("../routes/producto"));
const user_1 = __importDefault(require("../routes/user"));
const favorite_1 = __importDefault(require("../routes/favorite"));
const conection_1 = __importDefault(require("../db/conection"));
const path_1 = __importDefault(require("path"));
// Definición de la clase Server
class Server {
    // Constructor de la clase. Inicializa una nueva instancia de Express y la asigna a la propiedad 'app'. Inicializa listen()
    constructor() {
        console.log();
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares(); // El metodo de parseo antes que las rutas
        this.routes();
        this.dbConnect();
    }
    // Método 'listen' para iniciar el servidor
    listen() {
        // El servidor Express escucha en el puerto definido
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API works'
            });
        });
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/favorites', favorite_1.default);
        // Servir archivos estáticos desde la carpeta 'uploads'
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    midlewares() {
        // Paresear el body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectar la base de datos');
            }
        });
    }
}
exports.default = Server;
