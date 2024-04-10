import express from 'express';
import AccountController from '../controllers/account.controller';

const router = express.Router();

router.post('/signup', AccountController.signup);

router.get('/login', AccountController.login);

export default router;
