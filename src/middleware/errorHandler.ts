import { NextFunction, Request, Response } from "express";


  export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
    if (err) {
      if (err.message.includes("not found")) {
        res.status(404).json({
          success: false,
          message: err.message + "!",
          data: null,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          data: null,
        });
      }
      next();
    }
  }
