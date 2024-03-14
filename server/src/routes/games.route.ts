import express from 'express';
import GameController from '../controllers/games.controller';

const router = express.Router();

router.get('/:gameName/targets', GameController.targets);

router.get('/:gameName/leaderboard', GameController.leaderboard);

export default router;
