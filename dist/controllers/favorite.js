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
exports.postFavorite = exports.deleteFavorite = exports.getFavorites = void 0;
const favorite_1 = __importDefault(require("../models/favorite"));
const producto_1 = __importDefault(require("../models/producto"));
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        // Busca todos los favoritos del usuario específico
        const listFavorites = yield favorite_1.default.findAll({
            where: {
                idUser: idUser
            }
        });
        // Array para almacenar los IDs de los videojuegos favoritos del usuario
        const favoriteProductIds = listFavorites.map(favorite => favorite.idVideojuego);
        // Busca los productos correspondientes a los IDs de videojuegos favoritos
        const favoriteProducts = yield producto_1.default.findAll({
            where: {
                id: favoriteProductIds
            }
        });
        // Devuelve la lista de productos favoritos del usuario
        res.json(favoriteProducts);
    }
    catch (error) {
        console.error('Error al obtener los productos favoritos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los productos favoritos del usuario' });
    }
});
exports.getFavorites = getFavorites;
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idVideojuego } = req.params;
    const favorite = yield favorite_1.default.findOne({
        where: {
            idUser: idUser,
            idVideojuego: idVideojuego
        }
    });
    if (favorite) {
        yield favorite.destroy();
        res.json({
            msg: `Favorito eliminado con exito. Id: ${favorite.id}`
        });
    }
    else {
        res.status(404).json({
            msg: `No existe un favorito`
        });
    }
});
exports.deleteFavorite = deleteFavorite;
const postFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { idUser, idVideojuego } = body;
    try {
        const favorite = yield favorite_1.default.findOne({
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
        yield favorite_1.default.create(body);
        console.log(body);
        return res.json({
            msg: 'Favorito agregado con éxito.'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar un favorito.'
        });
    }
});
exports.postFavorite = postFavorite;
