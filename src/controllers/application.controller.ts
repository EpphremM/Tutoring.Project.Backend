import { NextFunction, Request, Response } from "express";
import { ApplicationInterface } from "../database/interfaces/application.interface";
import { applicationSchema } from "../zod/schemas/application.schema";
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
