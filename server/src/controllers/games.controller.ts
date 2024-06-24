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
    const existingEntryInLeaderboard = leaderboard[0]?.data.find(
      (entry) => entry.username === username
    );

    if (existingEntryInLeaderboard) {
      if (existingEntryInLeaderboard.time > time) {
        await Leaderboard.findOneAndUpdate(
          {
            gameName: gameName,
            'data.username': username,
          },
          { $set: { 'data.$.time': time } },
          { new: true }
        );
        return res.json({ updated: true });
      }
      res.json({ updated: false });
    } else {
      await Leaderboard.findOneAndUpdate(
        { gameName: gameName },
        { $push: { data: { username, time } } },
        { new: true }
      );

      res.json({ updated: true });
    }
  } catch (err) {
    next(err);
  }
};

const leaderboard_get_username = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameName, username } = req.params;
    const [{ data }] = await Leaderboard.find({ gameName: gameName })
      .select('data')
      .exec();

    const userEntry = data.find((entry) => entry.username === username);
    res.json(userEntry?.time);
  } catch (err) {
    next(err);
  }
};

export default {
  targets,
  leaderboard_get,
  leaderboard_post,
  leaderboard_get_username,
};
