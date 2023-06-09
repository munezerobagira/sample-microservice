import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const validateJwtRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    req.currentUser = null;
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = payload;
  } catch (e) {
    req.currentUser = null;
  }
  next();
};
