import { Router } from "express";
import { deleteUser, getUser, login, register } from "../controllers/user";

const router = Router();

router.delete('/:id', deleteUser);
router.post('/register', register);
router.post('/login', login);
router.post('/token', getUser);

export default router;