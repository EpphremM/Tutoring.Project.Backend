import { NextFunction, Request, Response } from "express";
import { TutorInterface } from "../database/interfaces/tutor.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { tutorSchema, tutorUpdateSchema } from "../zod/schemas/tutor.schema";
import { TutorRepository } from "../database/repositories/tutor.repository";
import { ResponseBody } from "../express/types/response.body";
import { AppError } from "../express/error/app.error";
import { JobRepository } from "../database/repositories/job.repository";
import { FamilyRepository } from "../database/repositories/family.repository";
import { ApplicationInterface } from "../database/interfaces/application.interface";
import { ApplicationRepository } from "../database/repositories/application.repository";
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TutorInterface = req.body;

    const { email }: TutorInterface = body;
    const previousTutor = await TutorRepository.getRepo().findByEmail(email);
    const validation = inputValidate(tutorSchema, body);
    console.log(validation);
    if (!validation.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validation.errors,
      });
      return;
    }
    if (previousTutor) {
      res.status(400).json({
        status: "fail",
        message: "Tutor already registered",
      });
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
        error
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
        error
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
    next(new AppError("error occured", 400, "operation", error));
  }
};
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const tutor: TutorInterface = await TutorRepository.getRepo().findOneById(
      id
    );
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
    next(new AppError("error occured", 400, "operational", error));
  }
};
export const applyJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body: ApplicationInterface = req.body;
    const { tutor_id, job_id } = body;
    if (!tutor_id || !job_id) {
      next(new AppError("Tutor ID and Job ID is required", 404, "Operational"));
      return;
    }
    const [tutor, job] = await Promise.all([
      TutorRepository.getRepo().findOneById(tutor_id),
      JobRepository.getRepo().findById(job_id),
    ]);
    if (!tutor) {
      next(new AppError("Tutor not found", 404, "Operational"));
      return;
    }
    console.log(job);
    if (!job) {
      next(new AppError("Job not found", 404, "Operational"));
      return;
    }
    if (tutor.credit < 1) {
      next(
        new AppError(
          "Insufficient balance. Please recharge your account.",
          400,
          "Operational"
        )
      );
      return;
    }
    const payment = await updateTutorCredit(tutor_id, "1", "spend");
    if (!payment) {
      next(
        new AppError("Failed to process application fee.", 400, "Operational")
      );
      return;
    }
    const [newTutor, application] = await Promise.all([
      TutorRepository.getRepo().apply(tutor, job),
      ApplicationRepository.getRepo().registration(body),
    ]);
    if (!newTutor || !application) {
      next(new AppError("Application submission failed.", 400, "Operational"));
      return;
    }
    const responseBody: ResponseBody<ApplicationInterface> = {
      status: "success",
      message: "Tutor applied successfully.",
      data: { payload: application },
    };
    res.status(200).json(responseBody);
  } catch (error) {
    next(
      new AppError(
        "An error occurred while processing your request.",
        500,
        "Operational",
        error
      )
    );
  }
};

export const Delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const application = await TutorRepository.getRepo().findOneById(id);
    if (!application) {
      next(new AppError("Tutor to found", 404, "Operational"));
    }
    const result = await TutorRepository.getRepo().Delete(id);
    if (!result) {
      next(new AppError("Tutor not deleted", 400, "Operational"));
    }
    const responseBody = {
      status: "success",
      message: "Tutor deleted successfully",
    };
    res.status(200).json(responseBody);
  } catch (error) {
    next(new AppError("Error occured during tutor", 400, "Operational"));
  }
};

export const updateTutorCredit = async (
  id: string,
  amount: string,
  operation
) => {
  try {
    const tutor = await TutorRepository.getRepo().findOneById(id);
    if (!tutor) {
      console.log("Tutor not found");
      return null;
    }
    if (operation === "topup") {
      const credit = Math.ceil(parseInt(amount) / 20);
      tutor.credit += credit;
    } else if (operation === "spend") {
      tutor.credit -= 1;
    }
    const newTutor = await TutorRepository.getRepo().updateCredit(tutor);
    if (!newTutor) {
      console.log("Tutor credit is not updated");
      return null;
    }
    return newTutor;
  } catch (error) {
    console.log("Error occured during updating tutor's credit");
    throw error;
  }
};
