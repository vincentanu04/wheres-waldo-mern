import { Request, Response, NextFunction } from 'express';
import Account from '../models/account.model';
const bcrypt = require('bcrypt');

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const exists = await Account.findOne({ username: username });

    if (exists) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await Account.create({ username, password: hash });

    res.status(200).json({ username, user });
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
