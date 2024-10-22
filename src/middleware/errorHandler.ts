import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message.includes("not found")) {
    res.status(404).json({status: 404,message: err.message + "!",});
  } else if (err.message.includes("nothing")) {
    res.status(304).json({status: 304, message: err.message + "!",});
  } else {
    res.status(500).json({status: 500, message: err.message + "!",});
  }
  next();
};
