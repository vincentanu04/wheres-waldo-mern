import { Request, Response } from 'express';

const targets = (req: Request, res: Response) => {
  const { gameName } = req.params;
  res.json({ targets: gameName });
};

const leaderboard = (req: Request, res: Response) => {
  const { gameName } = req.params;
  res.json({ gameName });
};

export default {
  targets,
  leaderboard,
};
