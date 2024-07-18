import { Router } from "express";
import UserController from '../controllers/user.controller';
import handleAuthSession from "../middleware/auth.middleware";


const router = new Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/refresh', UserController.refresh);

router.get('/me', handleAuthSession, UserController.retrieveUser);

router.put('/me', handleAuthSession, UserController.updateUser);

router.delete('/me', handleAuthSession, UserController.deleteUser);

export default router;