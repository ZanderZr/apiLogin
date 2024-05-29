"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer")); // Importa el módulo multer para manejar la carga de archivos
const uuid_1 = require("uuid"); // Importa la función v4 de la librería uuid para generar UUIDs únicos
const path_1 = __importDefault(require("path")); // Importa el módulo path para trabajar con rutas de archivo
// Configuración del almacenamiento de archivos utilizando multer.diskStorage
const storage = multer_1.default.diskStorage({
    destination: 'uploads', // Directorio donde se guardarán los archivos cargados
    filename: (req, file, cb) => {
        // Combina un UUID generado con la extensión del nombre de archivo original
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    }
});
// Exporta un middleware multer configurado con el almacenamiento definido
exports.default = (0, multer_1.default)({ storage });
