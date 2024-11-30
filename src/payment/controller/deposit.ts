import { NextFunction, Request, Response } from "express";
import { AppError } from "../../express/error/app.error";
import ENV from "../../shared/dot_env/utility";
import axios from "axios";
import { TransactionRepository } from "../repository/transaction.reponsitoy";
import { TransactionInterface } from "../interfaces/transaction.interface";
import { inputValidate } from "../../zod/middlewares/zod.validation";
import { transactionSchema } from "../../zod/schemas/transaction.schema";
import { ResponseBody } from "../../express/types/response.body";
import { TutorRepository } from "../../database/repositories/tutor.repository";
import { FamilyRepository } from "../../database/repositories/family.repository";

export const deposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TransactionInterface = req.body;
    const validation = inputValidate(transactionSchema, body);
    const { family_id, tutor_id } = body;

    if (!validation.status) {
      next(new AppError("Validation error", 400, "Operational"));
      return;
    }

    if ((!family_id && !tutor_id) || (family_id && tutor_id)) {
      next(
        new AppError(
          "Transaction failed: either both IDs are missing or both are provided",
          400,
          "Operational"
        )
      );
      return;
    }

    const ownerType = family_id ? "family" : "tutor";
    let transactionBody = {};
    let result;

    if (ownerType === "tutor") {
      const tutor = await TutorRepository.getRepo().findOneById(tutor_id);
      if (!tutor) {
        next(new AppError("Tutor not found", 404, "Operational"));
        return;
      }
      transactionBody = {
        first_name: tutor.first_name,
        last_name: tutor.last_name,
        email: tutor.email,
        phone_number:body.phone_number,
        amount: body.amount,
        tutor_id,
      };
    }

    if (ownerType === "family") {
      const family = await FamilyRepository.getRepo().findById(family_id);
      if (!family) {
        next(new AppError("Family not found", 404, "Operational"));
        return;
      }
      transactionBody = {
        first_name: family.first_name,
        last_name: family.last_name,
        email: family.email,
        phone_number: body.phone_number,
        amount: body.amount,
        family_id,
      };
    }

    result = await TransactionRepository.getRepo().Registration(transactionBody);
    if (!result) {
      next(new AppError("Could not register transaction", 400, "Operational"));
      return;
    }

    const { email, first_name, last_name, phone_number, tx_ref } = result;
    const amount = result.amount.toString();

    const options = {
      method: "POST",
      url: ENV.chapa_url,
      headers: {
        Authorization: `Bearer ${ENV.secrete_key}`,
        "Content-Type": "application/json",
      },
      data: {
        amount,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
      },
    };

    console.log("Request Options:", options);
    const response = await axios(options);

    if (!response.data || response.data.status !== "success") {
      next(new AppError("Transaction failed", 400, "Operational"));
      return;
    }

    const responseBody: ResponseBody<TransactionInterface> = {
      status: "success",
      message: "Please pay using the link below",
      data: { payload: response.data },
    };
    res.status(200).json(responseBody);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      next(
        new AppError(
          error.message,
          error.response?.status || 400,
          "Operational"
        )
      );
    } else {
      console.log(error);
      next(new AppError("Unexpected error occurred", 500, "Operational"));
    }
  }
};
