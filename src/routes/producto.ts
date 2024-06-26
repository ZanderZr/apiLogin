import { Router } from "express";
import { deleteProduct, getProduct, getProducts, getProductsSearch, postProduct, updateProduct } from "../controllers/producto";
import multer from '../libs/multer'

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.post('/', multer.single('imagen') ,postProduct);
router.put('/:id', multer.single('imagen'), updateProduct);
router.get('/search/:nombre', getProductsSearch);

export default router;