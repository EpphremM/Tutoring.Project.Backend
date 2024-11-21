import { NextFunction, Request, Response } from "express";
import { TransactionInterface } from "../database/interfaces/transaction.interface";
import { inputValidate } from "../zod/middlewares/zod.validation";
import { transactionSchema } from "../zod/schemas/transaction.schema";
import { ResponseBody } from "../express/types/response.body";
import { JobInterface } from "../database/interfaces/job.interface";
import { TransactionRepository } from "../database/repositories/transaction.reponsitoy";
import { AppError } from "../express/error/app.error";
import { error } from "console";

export const registration=async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const body:TransactionInterface=req.body;
        const validator=inputValidate(transactionSchema,body);
        if(!validator.status){
       res.status(400).json({
        status:"fail",
        message:"validation error",
        error:validator.errors
       })
       return;
        }
        const result:TransactionInterface=await new TransactionRepository().register(body);
        const responseBody:ResponseBody<TransactionInterface>={status:"success",message:"transaction created successfully",data:{payload:result}}
       res.status(200).json(responseBody);
    }catch(error){
        next(new AppError("error occured during transaction creation",400,error,"operational"))
    }

}