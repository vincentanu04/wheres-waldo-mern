import { NextFunction, Request, Response } from 'express';
import Account from '../models/account.model';
const jwt = require('jsonwebtoken');

interface AuthError extends Error {
  statusCode?: number;
}

const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error: AuthError = new Error('Authorization token required.');
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await Account.findOne({ _id }).select('_id');
    req.user = user;

    next();
  } catch (err) {
    const error: AuthError = new Error('Request is not authorized.');
    error.statusCode = 401;
    next(error);
  }
};

export default requireAuth;
