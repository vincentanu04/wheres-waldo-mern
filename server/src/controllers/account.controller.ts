import { Request, Response, NextFunction } from 'express';
import Account from '../models/account.model';
import { Types } from 'mongoose';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw Error('All fields must be filled.');
  }

  try {
    const exists = await Account.findOne({ username: username });

    if (exists) {
      throw new Error('Username already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await Account.create({ username, password: hash });

    const token = createToken(user._id);

    res.status(200).json({ username, token });
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
