import express from 'express';
import GameController from '../controllers/games.controller';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

router.get('/:gameName/targets', GameController.targets);

router.get('/:gameName/leaderboard', GameController.leaderboard_get);

router.use(requireAuth);

router.get(
  '/:gameName/leaderboard/:username',
  GameController.leaderboard_get_username
);

router.post('/:gameName/leaderboard', GameController.leaderboard_post);

export default router;
