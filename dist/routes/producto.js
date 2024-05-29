"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
const multer_1 = __importDefault(require("../libs/multer"));
const router = (0, express_1.Router)();
router.get('/', producto_1.getProducts);
router.get('/:id', producto_1.getProduct);
router.delete('/:id', producto_1.deleteProduct);
router.post('/', multer_1.default.single('imagen'), producto_1.postProduct);
router.put('/:id', producto_1.updateProduct);
exports.default = router;
