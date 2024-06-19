import { Request, Response, NextFunction } from 'express';
import Account from '../models/account.model';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    console.log('server:', username, password);
    const existingAccount = await Account.findOne({ username: username });

    if (existingAccount) {
      console.log('ACCOUTN ALREADY EXISTS');

      return;
    }

    console.log('ACCOUNT DOES NOT EXIST');

    await Account.create({ username, password });
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
