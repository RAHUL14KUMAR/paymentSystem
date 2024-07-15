import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const user=require('../model/userSchema');

export const authMiddleware = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header is missing" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const tokenData = jwt.verify(
      token,
      process.env.SECRET_KEY as jwt.Secret
    ) as { id: string };

    const users = await user.findOne({ _id: tokenData.id });

    if (users) {
      req.user = users;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};