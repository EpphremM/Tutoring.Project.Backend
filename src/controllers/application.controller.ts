import { NextFunction, Request, response, Response } from "express";
import { ApplicationInterface } from "../database/interfaces/application.interface";
import { applicationSchema, applicationUpdateSchema } from "../zod/schemas/application.schema";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { AppError } from "../express/error/app.error";
import { ApplicationRepository } from "../database/repositories/application.repository";
import { ResponseBody } from "../express/types/response.body";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ApplicationInterface = req.body;
    console.log("request body", body);
    const validator = inputValidate(applicationSchema, body);
    console.log(validator);
    if (!validator.status) {
      next(new AppError("validation error", 400, "operational"));
    }
    const result = await ApplicationRepository.getRepo().registration(body);
    console.log("result is ", result);
    if (!result) {
      next(new AppError("no application registered", 400, "operational"));
    }
    const responseBody: ResponseBody<ApplicationInterface> = {
      status: "success",
      message: "application registered successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    console.log(error);
    next(new AppError("error occured", 400, "operational", error));
  }
};
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params;
        const result:ApplicationInterface=await ApplicationRepository.getRepo().findById(id);
        if(!result){
            next(new AppError("application not found",400,"operational"))
        }
   const responseBody:ResponseBody<ApplicationInterface>={status:"success",message:"application registrered successfully",data:{payload:result}};
   res.status(200).json(responseBody);
    }catch(error){
        next(new AppError("error occured",400,"operational",error));
    }
   
}
export const update=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const body:ApplicationInterface=req.body;
        const {id}=req.params;
        const validator=inputValidate(applicationUpdateSchema,body);
        if(!validator.status){
            next(new AppError("validation error",400,"operational"))
        }
        const application:ApplicationInterface=await ApplicationRepository.getRepo().findById(id);
        if(!application){
            next(new AppError("there is no application found",404,"operational"))
        }
      const result:ApplicationInterface=await ApplicationRepository.getRepo().update(application,body);
      const responseBody:ResponseBody<ApplicationInterface>={status:"success",message:"application registered successfully",data:{payload:result}}
      res.status(200).json(responseBody);
    }catch(error){
        next(new AppError("error occured",400,"operational",error))
    }
}
export const findAll=async(req:Request,res:Response,next:NextFunction)=>{
try{
 const result=await ApplicationRepository.getRepo().find();
 if(!result){
    next(new AppError("application not found",200,"operational"))
 }
 const responseBody:ResponseBody<ApplicationInterface[]>={status:"success",message:"Application fetched successfully",data:{payload:result}};
 res.status(200).json(responseBody);
}catch(error){
    next(new AppError("error occured",400,"operational",error))
}
}