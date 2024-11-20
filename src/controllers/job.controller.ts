import { NextFunction, Request, Response } from "express";
import { JobInterface } from "../database/interfaces/job.interface";
import { AppError } from "../express/error/app.error";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { jobSchema } from "../zod/schemas/job.schema";
import { JobRepository } from "../database/repositories/job.repository";
import { ResponseBody } from "../express/types/response.body";

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
      new AppError("error occured during creating job", 400, error, "operation")
    );
  }
};
