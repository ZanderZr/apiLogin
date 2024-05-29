import multer from 'multer'; // Importa el módulo multer para manejar la carga de archivos
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de la librería uuid para generar UUIDs únicos
import path from 'path'; // Importa el módulo path para trabajar con rutas de archivo

// Configuración del almacenamiento de archivos utilizando multer.diskStorage
const storage = multer.diskStorage({
    destination: 'uploads', // Directorio donde se guardarán los archivos cargados
    filename: (req, file, cb) => { // Función para generar el nombre de archivo
        // Combina un UUID generado con la extensión del nombre de archivo original
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

// Exporta un middleware multer configurado con el almacenamiento definido
export default multer({ storage });
