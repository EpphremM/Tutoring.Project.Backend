import { NextFunction, Request, Response } from "express";
import { TutorInterface } from "../database/interfaces/tutor.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { tutorSchema, tutorUpdateSchema } from "../zod/schemas/tutor.schema";
import { TutorRepository } from "../database/repositories/tutor.repository";
import { ResponseBody } from "../express/types/response.body";
import { AppError } from "../express/error/app.error";
import { JobRepository } from "../database/repositories/job.repository";
import { FamilyRepository } from "../database/repositories/family.repository";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TutorInterface = req.body;
  
const {email}:TutorInterface=body;
const previousTutor=await  TutorRepository.getRepo().findByEmail(email);
    const validation = inputValidate(tutorSchema, body);
    console.log(validation);
    if (!validation.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validation.errors,
      });
      return;
    }if(previousTutor){
      res.status(400).json({
        status:"fail",
        message:"Tutor already registered"});
      return;
    }
    const result = await TutorRepository.getRepo().register(body);
    const responseBody: ResponseBody<TutorInterface> = {
      status: "success",
      message: "tutor registered successfully",
      data: { payload: result },
    };
    res.status(201).json(responseBody);
    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during during registration",
        400,
        "operational",
        error,
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
    const results = await TutorRepository.getRepo().find();
    if (!results) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
      return;
    }
    console.log(results);
    res.status(200).json({ status: "success", data: { payload: results } });

    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during validation",
        404,
        "validation failed",
        error,
      )
    );
  }
};
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await TutorRepository.getRepo().findOneById(id);

    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
      return;
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    return;
  } catch (error) {
    next(new AppError("error occured", 400, "operation",error));
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tutor: TutorInterface = await TutorRepository.getRepo().findOneById(id);
    const body: Partial<TutorInterface> = req.body;
    delete body.password;
    if (!tutor) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
      return;
    }
    const validator = inputValidate(tutorUpdateSchema, body);
    if (!validator.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validator.errors,
      });
      return;
    }
    const result = await TutorRepository.getRepo().update(tutor, body);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "tutor nor updated",
      });
      return;
    }
    if (!body) {
      res.status(200).json({
        statu: "success",
        message: "not change from perevious",
      });
      return;
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    return;
  } catch (error) {
    next(new AppError("error occured", 400, "operational",error));
  }
};

export const applyJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try{
  type ApplyReq = {
    tutor_id: string;
    job_id: string;
  };

  const body = req.body as ApplyReq;

  if (!req.body.tutor_id || !req.body.job_id) {
    res.status(404).json({
      status:"fail",
      message:"The job or tutor id is not found not found"
    })
    return;
  }
  const tutor = await TutorRepository.getRepo().findOneById(body.tutor_id);
  const job = await JobRepository.getRepo().findById(body.job_id);
if(!tutor){
  res.status(404).json({
    status:"fail",
    message:"tutor not found"
  })
}
if(!job){
  res.status(404).json({
    status:"fail",
    message:"job not found"
  })
}
  const newTutor: TutorInterface = await TutorRepository.getRepo().apply(tutor,job);
const responseBody:ResponseBody<TutorInterface>={status:"success",message:"tutor applied successfully",data:{payload:newTutor}};
 res.status(200).json(responseBody);
  return;
 }catch(error){
  next(new AppError("error occured",404,"operational",error))
 }
};
export const Delete=async(req:Request,res:Response,next:NextFunction)=>{
  try{
     const {id}=req.params;
     const application=await TutorRepository.getRepo().findOneById(id);
     if(!application){
      next(new AppError("Tutor to found",404,"Operational"));
     }
     const result= await TutorRepository.getRepo().Delete(id);
     if(!result){
      next(new AppError("Tutor not deleted",400,"Operational"));
     }
     const responseBody={status:"success",message:"Tutor deleted successfully"};
     res.status(200).json(responseBody);

  }catch(error){
    next(new AppError("Error occured during tutor",400,"Operational"))
  }
}

export const updateTutorCredit=async(id:string,amount:string)=>{
  try{
    const tutor=await TutorRepository.getRepo().findOneById(id)
    if(!tutor){
      console.log("Tutor not found");
      return null;
    }
    const credit = Math.ceil(parseInt(amount) / 20);
  tutor.credit+=credit;
  const newTutor=await TutorRepository.getRepo().updateCredit(tutor);
  if(!newTutor){
    console.log("Tutor credit is not updated");
    return null;
  }
  return newTutor;
  }catch(error){
    console.log("Error occured during updating tutor's credit")
    throw error;
  }
}