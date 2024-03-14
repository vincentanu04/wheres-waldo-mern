import { NextFunction, Request, Response } from 'express';
import Game from '../models/game.model';

const targets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameName } = req.params;
    const [{ targets }] = await Game.find({ name: gameName })
      .select('targets')
      .exec();

    res.json(targets);
  } catch (err) {
    next(err);
  }
};

const leaderboard = (req: Request, res: Response) => {
  const { gameName } = req.params;
  res.json({ gameName });
};

export default {
  targets,
  leaderboard,
};
