import { NextFunction, Request, Response } from "express";
import { StudentInterface } from "../database/interfaces/student.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { studentSchema, studentUpdateSchema } from "../zod/schemas/student.schema";
import { AppError } from "../express/error/app.error";
import { StudentRepository } from "../database/repositories/student.repository";
import { ResponseBody } from "../express/types/response.body";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: StudentInterface = req.body;
    const validator = inputValidate(studentSchema, body);
    console.log("validtor",validator); 
    if (!validator.status) {
      next(new AppError("validation error", 400, "operational"));
    }
    const result: StudentInterface = await StudentRepository.getRepo().register(body);
    console.log(result);
    const responseBody: ResponseBody<StudentInterface> = {
      status: "success",
      message: "student registered successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    next(new AppError("error occured during registration", 400, "operational",error));
  }
};
export const findAll=async(req:Request,res:Response,next:NextFunction)=>{
try{
  const result=await StudentRepository.getRepo().find();
  if(!result){
    next(new AppError("No student to be fetched",404,"operational"))
  }
  const responseBody:ResponseBody<StudentInterface[]>={status:"success",message:"studnet fethed successfully",data:{payload:result}}
  res.status(200).json(responseBody);

}catch(error){
    next(new AppError("error occured during fetching students",400,"operational",error));
}
}
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {id}:StudentInterface=req.body;
    const result:StudentInterface=await StudentRepository.getRepo().findById(id);
    if(!result){
      next(new AppError("Studnet not found",400,"operational"))
    }
    const responseBody:ResponseBody<StudentInterface>={status:"success",message:"Student fetched successfully",data:{payload:result}};
    res.status(200).json(responseBody);
  }catch(error){
    next(new AppError("error occured",400,"operational",error))
  }
}

export const update=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {id}=req.params;
    const body:Partial<StudentInterface>=req.body;
    const validator=inputValidate(studentUpdateSchema,body);
    if(!validator.status){
    next(new AppError("validation error",400,"operational"));
    }
    const student:StudentInterface=await StudentRepository.getRepo().findById(id);
    if(!student){
      next(new AppError("student not found",400,"operational"));
    }
   const result=await StudentRepository.getRepo().update(student,body);
   if(!result){
    next(new AppError("student not updated",400,"operational"));
   }
   const responseBody:ResponseBody<StudentInterface>={status:"success",message:"student updated successfully",data:{payload:result}};
   res.status(200).json(responseBody);
  }catch(error){
    next(new AppError("error occured during updating student data",400,"operational"));
  }
}