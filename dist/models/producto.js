"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conection_1 = __importDefault(require("../db/conection"));
const Producto = conection_1.default.define('Videojuego', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    genero: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    nota: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Producto;
