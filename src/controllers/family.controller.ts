import { NextFunction, Request, Response } from "express";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { familySchema, familyUpdateSchema } from "../zod/schemas/family.schema";
import { FamilyRepository } from "../database/repositories/family.repository";
import { FamilyInterface } from "../database/interfaces/family.interface";
import { ResponseBody } from "../express/types/response.body";
import { AppError } from "../express/error/app.error";
import { error } from "console";
import { Family } from "../database/entities/family.entity";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: FamilyInterface = req.body;
  const validator = inputValidate(familySchema, body);
  const { email }: FamilyInterface = body;
  console.log(email);
  console.log(validator);
  if (!validator.status) {
    res.status(400).json({
      message: "Validation error",
      error: validator.errors,
    });
    return;
  }
  const family = await FamilyRepository.getRepo().findByEmail(email);
  console.log(family);
  if (family) {
    next(new AppError("family is already registered",400,"operational"))
  }
  const result = await FamilyRepository.getRepo().register(body);
  const responseBody: ResponseBody<FamilyInterface> = {
    status: "success",
    message: "Family registered successully",
    data: { payload: result },
  };
  res.status(201).json(responseBody);
  return;
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await FamilyRepository.getRepo().findAll();
    console.log("result is ", results);
    if (!results) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
      return;
    }
    res.status(200).json({ status: "success", data: { payload: results } });
    return;
  } catch (error) {
    next(new AppError("error occured", 400, "operational",error));
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result:FamilyInterface = await FamilyRepository.getRepo().findById(id);
    if (!result) {
      next(new AppError("data not found",400,"operational"))
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    return;
  } catch (error) {
    next(new AppError("error occured", 400, "operational",error));
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body: Partial<FamilyInterface> = req.body;
    delete body.password;
    const validator = inputValidate(familyUpdateSchema, body);
    const family: FamilyInterface = await FamilyRepository.getRepo().findById(
      id
    );
    if (!validator.status) {
      res.status(400).json({
        message: "validation error",
        error: validator.errors,
      });
      return;
    }
    if (!family) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
      return;
    }
    const result = await FamilyRepository.getRepo().update(family, body);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "family not updated",
      });
      return;
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    return;
  } catch (error) {
    next(new AppError("error occured", 400, "operational",error));
  }
};
export const Delete=async(req:Request,res:Response,next:NextFunction)=>{
  try{
     const {id}=req.params;
     const application=await FamilyRepository.getRepo().findById(id);
     if(!application){
      next(new AppError("Family to found",404,"Operational"));
     }
     const result= await FamilyRepository.getRepo().Delete(id);
     if(!result){
      next(new AppError("Family not deleted",400,"Operational"));
     }
     const responseBody={status:"success",message:"Family deleted successfully"};
     res.status(200).json(responseBody);

  }catch(error){
    next(new AppError("Error occured during family",400,"Operational"))
  }
}