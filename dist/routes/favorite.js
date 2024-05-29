"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_1 = require("../controllers/favorite");
const router = (0, express_1.Router)();
router.get('/:idUser', favorite_1.getFavorites);
router.delete('/:idUser/:idVideojuego', favorite_1.deleteFavorite);
router.post('/', favorite_1.postFavorite);
exports.default = router;
