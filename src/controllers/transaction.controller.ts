import { NextFunction, Request, Response } from "express";
import { TransactionInterface } from "../database/interfaces/transaction.interface";
import { inputValidate } from '../zod/middlewares/zod.validation';
import { transactionSchema, transactionUpdateSchema } from "../zod/schemas/transaction.schema";
import { ResponseBody } from '../express/types/response.body';
import { JobInterface } from "../database/interfaces/job.interface";
import { TransactionRepository } from "../database/repositories/transaction.reponsitoy";
import { AppError } from "../express/error/app.error";
import { error } from "console";
import { Transaction } from "../database/entities/transaction.entity";

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
       return;
    }catch(error){
        next(new AppError("error occured during transaction creation",400,error,"operational"))
    }

}

export const findAll=async (req:Request,res:Response,next:NextFunction)=>{
try{
    const result:TransactionInterface[]
    = await new TransactionRepository().find()
    if(!result){
        res.status(200).json({status:"success",
            message:"there is no transaction record",
            data:[]
        })
        return;
    }
    const responseBody:ResponseBody<TransactionInterface[]>={status:"success",message:"transaction fetched successfully",data:{payload:result}};
    res.status(200).json(responseBody);
    return;
}catch(error){
    next(new AppError("error occered during fetching all transaction",400,error,"operational"))
}
}
export const findById=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params;
      const result:TransactionInterface=await new TransactionRepository().findById(id)
      console.log(result);
      if(!result){
        res.status(404).json({
            status:"fail",
            message:"there is no recored with this id",
            data:[]
        })
        return;
      }
      const responseBody:ResponseBody<TransactionInterface>={status:"success",message:"transaction fetched successfully",data:{payload:result}}
      res.status(200).json(responseBody);
      return;
    }catch(error){
        next(new AppError("error occured during fetching this transaction",400,error,"operational"))
    }
}

export const update=async(req:Request,res:Response,next:NextFunction)=>{
    try{
     const body:TransactionInterface=req.body;
     const {id}=req.params;
     const validator=inputValidate(transactionUpdateSchema,body);
     const transaction:TransactionInterface=await new TransactionRepository().findById(id);
     if(!validator.status){
        res.status(400).json({
            status:"fail",
            message:"validation error",
            data:[]
        })
        return;
     }
     if(!transaction){
        res.status(404).json({
            status:"fail",
            message:""
        })
        return;
     }
     const result:TransactionInterface=await new  TransactionRepository().update(transaction,body)
     const requestBody:ResponseBody<TransactionInterface>={status:"success",message:"updated successfully",data:{payload:result}}
    res.status(200).json(requestBody);
    }catch(error){
        next(new AppError("Error occured during updating transaction",400,error,"Operational"))
    }
}
