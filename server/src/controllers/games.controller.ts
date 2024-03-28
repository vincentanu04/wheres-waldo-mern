import { NextFunction, Request, Response } from 'express';
import Game from '../models/game.model';
import Leaderboard from '../models/leaderboard.model';

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

const leaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameName } = req.params;
    const [{ data }] = await Leaderboard.find({ gameName: gameName })
      .select('data')
      .exec();

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default {
  targets,
  leaderboard,
};
