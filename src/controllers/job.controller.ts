import { NextFunction, Request, Response } from "express";
import { JobInterface } from "../database/interfaces/job.interface";
import { AppError } from "../express/error/app.error";
import { jobSchema, jobUpdateSchema } from "../zod/schemas/job.schema";
import { JobRepository } from "../database/repositories/job.repository";
import { ResponseBody } from "../express/types/response.body";
import { inputValidate } from '../zod/middlewares/tutor.validation';
import { FamilyRepository } from "../database/repositories/family.repository";
import { TransactionInterface } from "../database/interfaces/transaction.interface";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: JobInterface = req.body;
    const validator = await inputValidate(jobSchema, body);
    if (!validator.status) {
      res.status(400).json({
        message: "validation error",
        error: validator.errors,
      });
      return;
    }
    const result: JobInterface = await new JobRepository().register(body);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "job not created",
      });
      return;
    }
    const responseBody: ResponseBody<JobInterface> = {
      status: "success",
      message: "job created successfully",
      data: { payload: result },
    };
    res.status(201).json({ responseBody });
    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during creating job",
        400,
        error,
        "operational"
      )
    );
  }
};
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results:JobInterface[] = await new JobRepository().find();
    if (!results) {
      res.status(404).json({
        status: "success",
        message: "No results found.",
        data: [],
      });
      return;
    }
    const responseBody:ResponseBody<JobInterface[]>= {
      status: "success",
      message: "Jobs fetched successfully",
      data: { payload: results },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during finding all jobs",
        400,
        error,
        "operational"
      )
    );
  }
};
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params;
    const result:JobInterface= await new JobRepository().findById(id);
    if(!result){
        res.status(404).
        json({status:"fail",message:"no job found by this id",data:[]});
        return;
    }
    const responseBody:ResponseBody<JobInterface>={
        status:"success",
        message:"job fetched successfully",
        data:{payload:result}
    }
    res.status(200).json(responseBody);
    return;
    }catch(error){
        next(new AppError("error occured during fetching the job",404,error,"operational"));
    }

}
export const update=async(req:Request,res:Response,next:NextFunction)=>{
try{
    const body:Partial<JobInterface>=req.body;
    const {id}=req.params;
    const job:JobInterface=await new JobRepository().findById(id);
    const validator=inputValidate(jobUpdateSchema,body);
    if(!validator.status){
        res.status(400).json({status:"fail",message:"validation failed",error:validator.errors})
        return;
    }else if(!job){
        res.status(400).json({status:"fail",message:"Job not found",data:[]})
        return;
    }
    const result= await new JobRepository().update(job,body)
    const responseBody:ResponseBody<JobInterface>={status:"success",message:"job updated successfully",data:{payload:result}};
    res.status(200).json(responseBody);
    return;

}catch(error){
    next(new AppError("error occured during updating the user",400,error,"operational"));
}
}