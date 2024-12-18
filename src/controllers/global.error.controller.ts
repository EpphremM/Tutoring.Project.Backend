import { Request, Response, NextFunction } from "express";
import { AppError } from "../express/error/app.error";
import { error } from "console";
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let statusCode: number = 500;
  let message: string = "Internal Server Error";
  let name:string="operational";
  let error:Error;
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
    name=err.name
    error=err.error;
  }

  res.status(statusCode).json({ message: message ,name:name,error:error.stack});
};
