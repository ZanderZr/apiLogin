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
// Registro. 
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    try {
        // Busca en la BD un usuario cuyo nombre de usuario o email coincida con los introducidos
        const user = yield user_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        if (!user) {
            // Si no existe lo crea
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
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, 'jcKey', { expiresIn: '1h' });
            res.json({ token: token });
        }
        else {
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        if (!token) {
            return res.status(400).json({ message: 'No se proporcionó ningún token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, 'jcKey');
        const userId = decoded.id;
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
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(400).json({ message: 'Token inválido' });
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(400).json({ message: 'Token expirado' });
        }
        else {
            res.status(400).json({ message: 'Error desconocido al verificar el token' });
        }
    }
});
exports.getUser = getUser;
