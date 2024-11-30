import { NextFunction, Request, Response } from "express";
import { AppError } from "../../express/error/app.error";
import ENV from "../../shared/dot_env/utility";
import axios from "axios";
import { TransactionRepository } from "../repository/transaction.reponsitoy";
import { TransactionInterface } from "../interfaces/transaction.interface";
import { inputValidate } from "../../zod/middlewares/zod.validation";
import { transactionSchema } from "../../zod/schemas/transaction.schema";
import { ResponseBody } from "../../express/types/response.body";
export const deposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: TransactionInterface = req.body;
    const validation = inputValidate(transactionSchema, body);
    if (!validation.status) {
      console.log(validation.errors);
      next(new AppError("Validation error", 400, "Operational"));
      return;
    }
    const result = await TransactionRepository.getRepo().Registration(body);
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
      data: JSON.stringify({
        amount,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
      }),
    };

    console.log("Request Options:", options);
    const response = await axios(options);

    console.log("Chapa API Response:", response.data);

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
      next(new AppError("Unexpected error occurred", 500, "Operational"));
    }
  }
};
