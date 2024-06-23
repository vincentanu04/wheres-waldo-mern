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

const leaderboard_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameName } = req.params;
    const [{ data }] = await Leaderboard.find({ gameName: gameName })
      .select('data')
      .exec();

    // ascending order
    data.sort((a, b) => a.time - b.time);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const leaderboard_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameName } = req.params;
    const { username, time } = req.body;
    const leaderboard = await Leaderboard.find({ gameName: gameName });
    const usernameExistsInLeaderboard = leaderboard[0]?.data.some(
      (entry) => entry.username === username
    );

    const authorizedUser = false;

    if (usernameExistsInLeaderboard) {
      if (!authorizedUser) {
        throw new Error(
          'Username already exists. Log in to an account to update your highest score!'
        );
      }
    } else {
      const response = await Leaderboard.findOneAndUpdate(
        { gameName: gameName },
        { $push: { data: { username, time } } },
        { new: true }
      );

      res.json(response);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  targets,
  leaderboard_get,
  leaderboard_post,
};
