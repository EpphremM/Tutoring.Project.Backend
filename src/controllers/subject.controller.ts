import { NextFunction, Request, Response } from "express";
import { SubjectInterface } from '../database/interfaces/subject.interface';
import { ZodSchema } from "zod";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { subjectSchema, subjectUpdateSchema } from "../zod/schemas/subject.schema";
import { AppError } from "../express/error/app.error";
import { SubjectRepository } from '../database/repositories/subject.repository';
import { ResponseBody } from "../express/types/response.body";
import { StudentInterface } from "../database/interfaces/student.interface";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const validator = inputValidate(subjectSchema, body);
  if (!validator.status) {
    next(new AppError("validation error", 400, "operational"));
  }
  const { name,student_id} = body;
  const subject: SubjectInterface[] = await SubjectRepository.getRepo().findByName(name,student_id)
  if (subject) {
    next(new AppError("subject already registered ", 400, "operational"));
  }
  const result = await SubjectRepository.getRepo().register(body);
  if (!result) {
    next(new AppError("no subject registered", 400, "operational"));
  }
  const responseBody: ResponseBody<SubjectInterface> = {
    status: "success",
    message: "subject is registered successfully",
    data: { payload: result },
  };
  res.status(200).json(responseBody);
};
export const findAll=async(req:Request,res:Response,next:NextFunction)=>{
  const {name,student_id}=req.body;
   const result:SubjectInterface[]= await SubjectRepository.getRepo().findByName(name,student_id);
   if(!result){
     next(new AppError("error in fetching subject",400,"operational"));
   }
   const responseBody:ResponseBody<SubjectInterface[]>={status:"success",message:"all subjects fetched sucessfully",data:{payload:result}};
   res.status(200).json(responseBody);
}
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}:SubjectInterface=req.body;
        const result:SubjectInterface=await SubjectRepository.getRepo().findById(id);
        if(!result){
            next(new AppError("subject not found",404,"operation"))
        }
        const responseBody:ResponseBody<SubjectInterface>={status:"success",message:"subject fetched successfully",data:{payload:result}};
        res.status(200).json(responseBody);

    }catch(error){
        next(new AppError("error occured during fetching",400,"operational",error));
    }
}
export const update=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const body:SubjectInterface=req.body;
        const {id}:SubjectInterface=body;
        const validator=inputValidate(subjectUpdateSchema,body);
        if(!validator.status){
            next(new AppError("validation error",400,"operational"))
        }
        const subject:SubjectInterface=await SubjectRepository.getRepo().findById(id);
        if(!subject){
            next(new AppError("subject is not found by this id",404,"operational"));
        }
        const result:SubjectInterface=await SubjectRepository.getRepo().update(subject,body);
        const responseBody:ResponseBody<SubjectInterface>={status:"success",message:"subject updated successfully",data:{payload:result}};
        res.status(200).json(responseBody);

    }catch(error){
        next(new AppError("error occured during updating subject",400,"operational"));
    }

}