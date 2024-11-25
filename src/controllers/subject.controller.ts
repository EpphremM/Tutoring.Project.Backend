import { NextFunction, Request, Response } from "express";
import { SubjectInterface } from "../database/interfaces/subject.interface";
import { ZodSchema } from "zod";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { subjectSchema } from "../zod/schemas/subject.schema";
import { AppError } from "../express/error/app.error";
import { SubejectRepository } from '../database/repositories/subject.repository';
import { ResponseBody } from "../express/types/response.body";

export const registration=async(req:Request,res:Response,next:NextFunction)=>{
    const body:SubjectInterface=req.body;
    const validator=inputValidate(subjectSchema,body);
    if(!validator.status){
      next(new AppError("validation error",400,"operational"));
    }
    // const {name}:SubjectInterface=body;
    // const subject:SubjectInterface[]=await SubejectRepository.getRepo().findByName(name);
    const result=await SubejectRepository.getRepo().register(body);
    if(!result){
        next(new AppError("no subject registered",400,"operational"))
    }
    const responseBody:ResponseBody<SubjectInterface>={status:"success",message:"subject is registered successfully",data:{payload:result}}
    res.status(200).json(responseBody);
     
}