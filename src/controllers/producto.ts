import { Request, Response } from 'express';
import Producto from '../models/producto';
import path from 'path';
import fs from 'fs-extra';
import { Op } from 'sequelize';

// Obtiene todos los productos
export const getProducts = async (req: Request, res: Response) =>{

    const listProducts = await Producto.findAll();

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        })
    }
}

export const getProductsSearch = async (req: Request, res: Response) => { 
    try {
        const { nombre } = req.params;
        const products = await Producto.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%` // Búsqueda de productos cuyo nombre contenga la cadena de búsqueda
                }
            }
        });
        res.json(products); // Enviar los productos encontrados como respuesta
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' }); // Manejar errores internos del servidor
    }
};

export const deleteProduct = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const product = await Producto.findByPk(id);

     if(product) {
        if(product.imagen){
        await fs.unlink(product.imagen); // Elimina la imagen de la carpeta uploads
        }
        await product.destroy();
        res.json({
            msg: `Producto eliminado con exito. Id: ${id}`
        });
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        })
    }
}

export const postProduct = async (req: Request, res: Response) =>{

    const { nombre, genero, precio, nota} = req.body;

    console.log(req.file)

    const newProduct = {
        nombre: nombre,
        genero: genero,
        precio: precio,
        nota: nota,
        imagen: req.file?.path
    };

    try {
        await Producto.create(newProduct);

    res.json({
        msg: 'Producto agregado con exito.',
        newProduct
    })
    } catch (error) {
        console.log(error);
        console.log('Error al agregar un producto');
    }
}

export const updateProduct = async (req: Request, res: Response) =>{
    
    const { nombre, genero, precio, nota} = req.body;
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    const editedProduct = {
        nombre: nombre,
        genero: genero,
        precio: precio,
        nota: nota,
        imagen: req.file?.path
    };

    if(product) {
        try {
            await product.update(editedProduct);

        res.json({
            msg: `Producto actualizado con exito`
        });
        } catch (error) {
            console.log(error);
            console.log('Error al actualizar un producto');
        }
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id: ${id}`
        })
    }
}