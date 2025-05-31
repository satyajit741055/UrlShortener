import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or whatever type your userId should be
      user?: any; // if you also attach user object
    }
  }
}

export {};