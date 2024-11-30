import { NextFunction, Request, Response } from "express";
import { inputValidate } from "../../zod/middlewares/zod.validation";
import {
  transactionSchema,
  transactionUpdateSchema,
} from "../../zod/schemas/transaction.schema";
import { ResponseBody } from "../../express/types/response.body";
import { TransactionRepository } from "../repository/transaction.reponsitoy";
import { AppError } from "../../express/error/app.error";
import { FamilyRepository } from "../../database/repositories/family.repository";
import { TutorRepository } from "../../database/repositories/tutor.repository";
import { TransactionInterface } from '../interfaces/transaction.interface';
export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TransactionInterface = req.body;
    const validator = inputValidate(transactionSchema, body);
    const { family_id, tutor_id }: TransactionInterface = body;
    if (!validator.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        error: validator.errors,
      });
      return;
    }
    if (family_id && tutor_id) {
      res.status(400).json({
        status: "fail",
        message: "can not register family and tutor at a time",
      });
      return;
    }
    if (!family_id && !tutor_id) {
      res.status(400).json({
        status: "fail",
        message: "Transaction can not create with out tutor id or family id",
      });
      return;
    }

    const family = await FamilyRepository.getRepo().findById(family_id);
    const tutor = await TutorRepository.getRepo().findOneById(tutor_id);
    if (!family && !tutor) {
      next(
        new AppError(
          "can not register transaction with empty tutor or family",
          400,
          "operational"
        )
      );
    }
    const result: TransactionInterface =
      await TransactionRepository.getRepo().register(body);
    const responseBody: ResponseBody<TransactionInterface> = {
      status: "success",
      message: "transaction created successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during transaction creation",
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
    const result: TransactionInterface[] =
      await TransactionRepository.getRepo().find();
    if (!result) {
      next(new AppError("there is no transaction record", 200, "operational"));
    }
    const responseBody: ResponseBody<TransactionInterface[]> = {
      status: "success",
      message: "transaction fetched successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    next(
      new AppError(
        "error occered during fetching all transaction",
        400,
        "operational",
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
    const result: TransactionInterface =
      await TransactionRepository.getRepo().findById(id);
    console.log(result);
    if (!result) {
      res.status(404).json({
        status: "fail",
        message: "there is no recored with this id",
        data: [],
      });
      return;
    }
    const responseBody: ResponseBody<TransactionInterface> = {
      status: "success",
      message: "transaction fetched successfully",
      data: { payload: result },
    };
    res.status(200).json(responseBody);
    return;
  } catch (error) {
    next(
      new AppError(
        "error occured during fetching this transaction",
        400,
        "operational",
        error
      )
    );
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TransactionInterface = req.body;
    delete body.tx_ref;
    const { id } = req.params;
    const validator = inputValidate(transactionUpdateSchema, body);
    const transaction: TransactionInterface =
      await TransactionRepository.getRepo().findById(id);
    if (!validator.status) {
      res.status(400).json({
        status: "fail",
        message: "validation error",
        data: [],
      });
      return;
    }
    if (!transaction) {
      res.status(404).json({
        status: "fail",
        message: "",
      });
      return;
    }
    const result: TransactionInterface =
      await TransactionRepository.getRepo().update(transaction, body);
    const requestBody: ResponseBody<TransactionInterface> = {
      status: "success",
      message: "updated successfully",
      data: { payload: result },
    };
    res.status(200).json(requestBody);
  } catch (error) {
    next(
      new AppError(
        "Error occured during updating transaction",
        400,
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
    const application = await TransactionRepository.getRepo().findById(id);
    if (!application) {
      next(new AppError("Transaction to found", 404, "Operational"));
    }
    const result = await TransactionRepository.getRepo().Delete(id);
    if (!result) {
      next(new AppError("Transaction not deleted", 400, "Operational"));
    }
    const responseBody = {
      status: "success",
      message: "Transaction deleted successfully",
    };
    res.status(200).json(responseBody);
  } catch (error) {
    next(new AppError("Error occured during transaction", 400, "Operational"));
  }
};
