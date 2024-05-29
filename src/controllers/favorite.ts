import { Request, Response } from 'express';
import Favorite from '../models/favorite';
import Producto from '../models/producto';

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;

        // Busca todos los favoritos del usuario específico
        const listFavorites = await Favorite.findAll({
            where: {
                idUser: idUser
            }
        });

        // Array para almacenar los IDs de los videojuegos favoritos del usuario
        const favoriteProductIds = listFavorites.map(favorite => favorite.idVideojuego);

        // Busca los productos correspondientes a los IDs de videojuegos favoritos
        const favoriteProducts = await Producto.findAll({
            where: {
                id: favoriteProductIds
            }
        });

        // Devuelve la lista de productos favoritos del usuario
        res.json(favoriteProducts);
    } catch (error) {
        console.error('Error al obtener los productos favoritos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los productos favoritos del usuario' });
    }
};

export const deleteFavorite = async (req: Request, res: Response) => {

    const { idUser, idVideojuego } = req.params;

    const favorite = await Favorite.findOne({
        where: {
            idUser: idUser,
            idVideojuego: idVideojuego
        }
    });

    if (favorite) {
        await favorite.destroy();
        res.json({
            msg: `Favorito eliminado con exito. Id: ${favorite.id}`
        });
    } else {
        res.status(404).json({
            msg: `No existe un favorito`
        })
    }
};

export const postFavorite = async (req: Request, res: Response) => {
    const { body } = req;
    const { idUser, idVideojuego } = body;

    try {
        const favorite = await Favorite.findOne({ 
            where: {
                idUser: idUser,
                idVideojuego: idVideojuego
            }
        });

        if (favorite) {
            return res.status(400).json({
                msg: 'El favorito ya existe.'
            });
        }

        await Favorite.create(body);
        console.log(body);

        return res.json({
            msg: 'Favorito agregado con éxito.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar un favorito.'
        });
    }
};