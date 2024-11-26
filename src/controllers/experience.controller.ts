import { NextFunction, Request, Response } from "express";
import { AppError } from "../express/error/app.error";
import { ExperienceInterface } from "../database/interfaces/experience.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { experienceSchema } from "../zod/schemas/experience.schema";
import { ExperienceRepository } from "../database/repositories/experience.repository";
import { ResponseBody } from "../express/types/response.body";
import { TutorRepository } from "../database/repositories/tutor.repository";
import { TutorInterface } from "../database/interfaces/tutor.interface";
import { UUID } from "crypto";

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
