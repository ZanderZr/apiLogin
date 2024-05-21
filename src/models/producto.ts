import { DataTypes } from 'sequelize';
import db from '../db/conection';

const Producto = db.define('Videojuego', {
    nombre: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DOUBLE
    },
    nota: {
        type: DataTypes.DECIMAL
    }

}, {
    createdAt: false,
    updatedAt: false
})

export default Producto;