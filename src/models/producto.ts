import { DataTypes, Model } from 'sequelize';
import db from '../db/conection';

interface IProducto extends Model {
    nombre: string,
    genero: string,
    precio: number,
    nota: number,
    imagen: string
}

const Producto = db.define<IProducto>('Videojuego', {
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
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    createdAt: false,
    updatedAt: false
})

export default Producto;