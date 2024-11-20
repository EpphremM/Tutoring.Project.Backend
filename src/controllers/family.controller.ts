import { NextFunction, Request, Response } from "express";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { familySchema, familyTutorSchema } from "../zod/schemas/family.schema";
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
  console.log(validator);
  if (!validator.status) {
    res.status(400).json({
      message: "validation error",
      error: validator.errors,
    });
  }
  const result = await new FamilyRepository().register(body);
  const responseBody: ResponseBody<FamilyInterface> = {
    status: "success",
    data: { payload: result },
  };
  res.status(201).json(responseBody);
  next();
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await new FamilyRepository().find();
    console.log("result is ", results);
    if (!results) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    res.status(200).json({ status: "success", data: { payload: results } });
  } catch (error) {
    next(new AppError("error occured", 400, error, "operational"));
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await new FamilyRepository().findById(id);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    res.status(200).json({ status: "success", data: { payload: result } });
  } catch (error) {
    next(new AppError("error occured", 400, error, "operational"));
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
    const validator = inputValidate(familyTutorSchema, body);
    const family: FamilyInterface = await new FamilyRepository().findById(id);
    if (!validator.status) {
      res.status(400).json({
        message: "validation error",
        error: validator.errors,
      });
    }
    if (!family) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    const result = await new FamilyRepository().update(family, body);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "family not updated",
      });
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    next();
  } catch (error) {
    next(new AppError("error occured", 400, error, "operational"));
  }
};