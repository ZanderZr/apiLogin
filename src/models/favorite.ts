import { DataTypes, Model } from 'sequelize';
import db from '../db/conection';

interface IFavorite extends Model {
    id?: number,
    idUser: number,
    idVideojuego: number
}

const Favorite = db.define<IFavorite>('Favorite', {
    idUser: {
        type: DataTypes.INTEGER
    },
    idVideojuego: {
        type: DataTypes.INTEGER
    }
}, {
    createdAt: false,
    updatedAt: false
})

export default Favorite;