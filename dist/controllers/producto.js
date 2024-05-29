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
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// Obtiene todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield producto_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        yield fs_extra_1.default.unlink(product.imagen); // Elimina la imagen de la carpeta uploads
        yield product.destroy();
        res.json({
            msg: `Producto eliminado con exito. Id: ${id}`
        });
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        });
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nombre, genero, precio, nota } = req.body;
    console.log(req.file);
    const newProduct = {
        nombre: nombre,
        genero: genero,
        precio: precio,
        nota: nota,
        imagen: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
    };
    try {
        yield producto_1.default.create(newProduct);
        res.json({
            msg: 'Producto agregado con exito.',
            newProduct
        });
    }
    catch (error) {
        console.log(error);
        console.log('Error al agregar un producto');
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { nombre, genero, precio, nota } = req.body;
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    const editedProduct = {
        nombre: nombre,
        genero: genero,
        precio: precio,
        nota: nota,
        imagen: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path
    };
    if (product) {
        try {
            yield product.update(editedProduct);
            res.json({
                msg: `Producto actualizado con exito`
            });
        }
        catch (error) {
            console.log(error);
            console.log('Error al actualizar un producto');
        }
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        });
    }
});
exports.updateProduct = updateProduct;
