import { NextFunction, Request, Response } from "express";
import { AppError } from "../express/error/app.error";
import { ExperienceInterface } from "../database/interfaces/experience.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { experienceSchema, experienceUpdateSchema } from "../zod/schemas/experience.schema";
import { ExperienceRepository } from "../database/repositories/experience.repository";
import { ResponseBody } from "../express/types/response.body";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tutor_id = req.body;
    const body: ExperienceInterface = req.body;
    const { workedAt }: ExperienceInterface = body;
    const validator = inputValidate(experienceSchema, body);
    console.log(body);
    console.log(validator);
    if (!validator.status) {
      next(new AppError(`validation error`, 400, "Operational"));
    }
    const result = await ExperienceRepository.getRepo().register(body);
    if (!result) {
      next(
        new AppError("Could not register this experience", 400, "Operation")
      );
    }
    const responseBody: ResponseBody<ExperienceInterface> = {
      status: "success",
      message: "Experience registered successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    console.log(error);
    next(
      new AppError(
        "Error occured during registering experience",
        400,
        "Operational",
        error
      )
    );
  }
};
export const findAll=async(req:Request,res:Response,next:NextFunction)=>{
    try{
     const result:ExperienceInterface[]=await ExperienceRepository.getRepo().find();
     if(!result){
        next(new AppError("Experience not found",404,"Operational"))
     }
     const responseBody:ResponseBody<ExperienceInterface[]>={status:"success",message:"Experience fetched successfully",data:{payload:result}}
     res.status(200).json(responseBody);
     return;
    }catch(error){
        next(new AppError("Error occuring fetching experience",400,"Operational"))
    }
}
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
   const {id}=req.params;
   const result:ExperienceInterface=await ExperienceRepository.getRepo().findById(id);
   if(!result){
    next(new AppError("Experience not found",404,"Operational"));
   }
   const responseBody:ResponseBody<ExperienceInterface>={status:"success",message:"Experience fetched successfully",data:{payload:result}};
   res.status(200).json(responseBody);
   return;
    }catch(error){
        next(new AppError("Error occured during fetching experience",400,"Operational"))
    }
}
export const update=async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const {id}=req.params;
    const body:ExperienceInterface=req.body;
    const validator=inputValidate(experienceUpdateSchema,body);
    if(!validator.status){
        next(new AppError("Validation error",400,"Operational"))
    }
    const experience:ExperienceInterface=await ExperienceRepository.getRepo().findById(id);
    if(!experience){
        next(new AppError("Experience not found to update",400,"Operational"))
    }
    const result:ExperienceInterface=await ExperienceRepository.getRepo().update(experience,body);
    if(!result){
        next(new AppError("Experience  not updated",400,"Operational"))
    }
    const responseBody:ResponseBody<ExperienceInterface>={status:"success",message:"Experience updated successfully",data:{payload:result}}
    res.status(200).json(responseBody);
  return;
    }catch(error){
        next(new AppError("Error occured during updating an Experience",400,"Operational"))
    }
}


export const Delete=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const {id}=req.params;
       const application=await ExperienceRepository.getRepo().findById(id);
       if(!application){
        next(new AppError("Experience to found",404,"Operational"));
       }
       const result= await ExperienceRepository.getRepo().Delete(id);
       if(!result){
        next(new AppError("Experience not deleted",400,"Operational"));
       }
       const responseBody={status:"success",message:"Experience deleted successfully"};
       res.status(200).json(responseBody);
  
    }catch(error){
      next(new AppError("Error occured during experience",400,"Operational"))
    }
  }