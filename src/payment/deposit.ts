import { NextFunction, Request, Response } from "express";
import { AppError } from "../express/error/app.error";

export const deposit=async(require:Request,res:Response,next:NextFunction)=>{
    try{
     
    }catch(error){
        next(new AppError("Error occured during making transaction",400,"Operational",error));
    }
}