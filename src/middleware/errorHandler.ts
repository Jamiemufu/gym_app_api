import { NextFunction, Request, Response } from "express";


  export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
    if (err) {
      if (err.message.includes("not found")) {
        res.status(404).json({
          message: err.message + "!",
        });
      } else {
        res.status(500).json({
          message: err.message,
        });
      }
      next();
    }
  }
