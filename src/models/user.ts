import { DataTypes, Model } from 'sequelize';
import db from '../db/conection';

interface UserInstance extends Model {
    id: number;
    email: string;
    username: string;
    password: string;
  }

const User = db.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false

    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }

}, {
    createdAt: false,
    updatedAt: false
})

export default User;