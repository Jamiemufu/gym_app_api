import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    switch (err.message) {
      case err.message.includes("not found"):
        res.status(404).json({
          message: err.message + "!",
        });
        break;
      case err.message.includes("Nothing"):
        res.status(304).json({
          message: err.message + "!",
        });
        break;
        default: 
          res.status(500).json({
            message: err.message,
          });
    
    }
    next();
  }
};
