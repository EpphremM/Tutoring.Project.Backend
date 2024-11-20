import { NextFunction, Request, Response } from "express";
import { TutorInterface } from "../database/interfaces/tutor.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { tutorSchema, tutorUpdateSchema } from "../zod/schemas/tutor.schema";
import { TutorRepository } from "../database/repositories/tutor.repository";
import { ResponseBody } from "../express/types/response.body";
import { AppError } from "../express/error/app.error";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TutorInterface = req.body;
    const validation = inputValidate(tutorSchema, body);
    console.log(validation);
    if (!validation.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validation.errors,
      });
    }
    const result = await new TutorRepository().register(body);
    const responseBody: ResponseBody<TutorInterface> = {
      status: "success",
      data: { payload: result },
    };
    res.status(201).json({ responseBody });
    next();
  } catch (error) {
    next(
      new AppError(
        "error occured during during registration",
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
    const results = await new TutorRepository().find();
    if (!results) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    console.log(results);
    res.status(200).json({ status: "success", data: { payload: results } });

    next();
  } catch (error) {
    next(
      new AppError(
        "error occured during validation",
        404,
        error,
        "validation failed"
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
    const result = await new TutorRepository().findOneById(id);

    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    next();
  } catch (error) {
    next(new AppError("error occured", 400, error, "operation"));
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tutor:TutorInterface = await new TutorRepository().findOneById(id);
    const body:Partial<TutorInterface> = req.body;
    delete body.password;
    if (!tutor) {
      res.status(400).json({
        status: "fail",
        message: "data not found",
      });
    }
    const validator = inputValidate(tutorUpdateSchema, body);
    if (!validator.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validator.errors,
      });
    }
    const result = await new TutorRepository().update(tutor, body);
    if (!result) {
      res.status(400).json({
        status: "fail",
        message: "tutor nor updated",
      });
    }
    if (!body) {
      res.status(200).json({
        statu: "success",
        message: "not change from perevious",
      });
    }
    res.status(200).json({ status: "success", data: { payload: result } });
    next();
  } catch (error) {
    next(new AppError("error occured", 400, error, "operational"));
  }
};
