import { Request, Response } from 'express';
import Game from '../models/game.model';

const targets = async (req: Request, res: Response) => {
  const { gameName } = req.params;
  const [{ targets }] = await Game.find({ name: gameName })
    .select('targets')
    .exec();

  res.json(targets);
};

const leaderboard = (req: Request, res: Response) => {
  const { gameName } = req.params;
  res.json({ gameName });
};

export default {
  targets,
  leaderboard,
};
