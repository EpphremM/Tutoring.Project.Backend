import { NextFunction, Request, Response } from "express";
import { SubjectInterface } from "../database/interfaces/subject.interface";
import { ZodSchema } from "zod";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { subjectSchema } from "../zod/schemas/subject.schema";
import { AppError } from "../express/error/app.error";

export const registration=async(req:Request,res:Response,next:NextFunction)=>{
    const body:SubjectInterface=req.body;
    const validator=inputValidate(subjectSchema,body);
    if(!validator.status){
      next(new AppError("validation error",400,"operational"));
    }
}