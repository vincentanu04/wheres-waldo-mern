import express from 'express';
import GameController from '../controllers/games.controller';

const router = express.Router();

router.get('/:id/targets/:targetId', GameController.target);

router.get('/:id/leaderboard', GameController.leaderboard);

export default router;
