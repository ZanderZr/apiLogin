import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto';
import routesUser from '../routes/user';
import routesFavorite from '../routes/favorite';
import db from '../db/conection';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Definición de la clase Server
class Server {
    
    // Propiedades privadas de la clase
    private app: Application;
    private port: string; // Puerto en el que el servidor escuchará

    // Constructor de la clase. Inicializa una nueva instancia de Express y la asigna a la propiedad 'app'. Inicializa listen()
    constructor() {
        console.log();
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares(); // El metodo de parseo antes que las rutas
        this.routes();
        this.dbConnect();
    }

    // Método 'listen' para iniciar el servidor
    listen() {
        // El servidor Express escucha en el puerto definido
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API works'
            })

        })
        
        this.app.use('/api/productos', routesProducto)
        this.app.use('/api/users', routesUser)
        this.app.use('/api/favorites', routesFavorite)
        // Servir archivos estáticos desde la carpeta 'uploads'
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }

    midlewares() {
        // Paresear el body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.log(error);
            console.log('Error al conectar la base de datos');
        }
    }
}

export default Server;
