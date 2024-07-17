import { Router } from 'express';
import User from "../models/user.model";
import Secret from "../models/secret.model";
import SecretController from '../controllers/secret.controller';
import handleAuthSession from "../middleware/auth.middleware";

const router = new Router();

router.get('', handleAuthSession, SecretController.all);

router.post('', handleAuthSession, SecretController.create);

router.get('/:id', handleAuthSession, SecretController.read);

router.put('/:id', handleAuthSession, SecretController.update);

router.delete('/:id', handleAuthSession, SecretController.delete);

export default router;