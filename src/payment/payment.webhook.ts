import { NextFunction, Request, Response } from "express";
import { AppError } from "../express/error/app.error";
import crypto from 'crypto';
import ENV from "../shared/dot_env/utility";
import { findOwner, updateStatus } from "./controller/transaction.controller";
import { FamilyRepository } from "../database/repositories/family.repository";
import { updateFamilyCredit } from "../controllers/family.controller";
import { TutorRepository } from "../database/repositories/tutor.repository";
import { updateTutorCredit } from "../controllers/tutor.controller";

export const verifyWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    const hash = crypto.createHmac('sha256', ENV.secrete_key).update(JSON.stringify(body)).digest('hex');
    if (hash !== req.headers['Chapa-Signature'] && hash !== req.headers['x-chapa-signature']) {
        console.log("Hash verification failed");
       res.status(400).json({ status: "failed", message: "Verification failed", data: [] });
    }

    const { event, tx_ref, amount } = body;
    if (!tx_ref) {
        res.status(400).json({ error: "Missing transaction reference" });
        return 
    }
    switch (event) {
      case "charge.success":
        const { ownerType, ownerId } = await findOwner(tx_ref);
        console.log("Owner type is ",ownerType);
        console.log("Owner id",ownerId);
        if (!ownerId || !ownerType) {
          return next(new AppError("Owner not found", 400, "Operation"));
        }

        let result;
        if (ownerType === "family") {
          const family = await FamilyRepository.getRepo().findById(ownerId);
          if (!family) {
            return next(new AppError("Family not found", 400, "Operation"));
          }
          result = await updateFamilyCredit(ownerId, amount,"topup");
          if (!result) {
            return next(new AppError("Family credit not updated", 400, "Operational"));
          }
        }

        if (ownerType === "tutor") {
          const tutor = await TutorRepository.getRepo().findOneById(ownerId);
          console.log(tutor);
          if (!tutor) {
            return next(new AppError("Tutor not found", 400, "Operation"));
          }
          result = await updateTutorCredit(ownerId, amount,"topup");
          if (!result) {
            return next(new AppError("Tutor credit not updated", 400, "Operational"));
          }
        }
        await updateStatus(tx_ref, "success");

        const responseBody = {
          status: "success",
          message: "Transaction completed successfully",
          data: { payload: { result } },
        };
        res.status(200).json(responseBody);
        return 

      case "charge.failed/cancelled":
        console.log("Charge failed");
        await updateStatus(tx_ref, "failed");
        break;

      case "charge.pending":
        await updateStatus(tx_ref, "pending");
        break;
    }

    console.log(body);
    const responseBody = {
      status: "success",
      message: "Transaction verified successfully",
      data: { payload: { body } },
    };
    res.status(200).json(responseBody);
    return 

  } catch (error) {
    next(new AppError("Error occurred during verification of payment", 400, "Operational", error));
  }
};
