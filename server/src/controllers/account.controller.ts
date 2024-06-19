import { Request, Response, NextFunction } from 'express';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    console.log('server:', username, password);
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
  } catch (err) {
    next(err);
  }
};

export default { signup, login };
