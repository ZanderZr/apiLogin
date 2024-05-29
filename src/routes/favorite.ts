import { Router } from "express";
import { deleteFavorite, getFavorites, postFavorite} from "../controllers/favorite";

const router = Router();

router.get('/:idUser', getFavorites);
router.delete('/:id', deleteFavorite);
router.post('/', postFavorite);

export default router;