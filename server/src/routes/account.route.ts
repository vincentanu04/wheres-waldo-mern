import express from 'express';
import AccountController from '../controllers/account.controller';

const router = express.Router();

router.post('/signup', AccountController.signup);

export default router;
