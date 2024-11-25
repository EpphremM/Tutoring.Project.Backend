import { NextFunction, Request, Response } from "express";
import { StudentInterface } from "../database/interfaces/student.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { studentSchema } from "../zod/schemas/student.schema";
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
