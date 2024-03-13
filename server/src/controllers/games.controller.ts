import express, { Request, Response } from 'express';

const target = (req: Request, res: Response) => {
  res.json({ id: req.params.id, targetId: req.params.targetId });
};

const leaderboard = (req: Request, res: Response) => {
  res.json(`THIS IS GAME ${req.params.id}'S LEADERBOARD`);
};

export default {
  target,
  leaderboard,
};
