import { Request, Response } from 'express';
import Producto from '../models/producto';
import path from 'path';
import fs from 'fs-extra';

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

export const deleteProduct = async (req: Request, res: Response) =>{

    const { id } = req.params;
    const product = await Producto.findByPk(id);

     if(product) {
        await fs.unlink(product.imagen); // Elimina la imagen de la carpeta uploads

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
    
    const { body } = req;
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(product) {
        try {
            await product.update(body);

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