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
exports.getUser = exports.login = exports.register = exports.deleteUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        yield user.destroy();
        res.json({
            msg: `Usuario eliminado con exito. Id: ${id}`
        });
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        });
    }
});
exports.deleteUser = deleteUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        const user = yield user_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (!user) {
            yield user_1.default.create(req.body);
            res.json({
                msg: 'Usuario agregado con exito.'
            });
        }
        else {
            console.log('Email o Username no disponibles');
            res.status(400).json({ msg: 'Email o Username no disponibles' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al agregar un usuario' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, 'jcKey', { expiresIn: '1h' }); // Genera un token
            res.json({ token: token });
        }
        else {
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    }
    catch (_a) {
        console.error(Error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        // Verificar y decodificar el token
        const decoded = jsonwebtoken_1.default.verify(token, 'your-secret-key');
        const userId = decoded.id;
        // Buscar al usuario en la base de datos
        const user = yield user_1.default.findByPk(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
});
exports.getUser = getUser;
