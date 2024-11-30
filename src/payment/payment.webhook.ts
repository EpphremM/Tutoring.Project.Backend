import { NextFunction, Request, Response } from "express";
import { AppError } from "../express/error/app.error";
import crypto from 'crypto'
import ENV from "../shared/dot_env/utility";
import { updateStatus } from "./controller/transaction.controller";
export const verifyWebhook=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const body=req.body;
        const hash = crypto.createHmac('sha256', ENV.secrete_key).update(JSON.stringify(body)).digest('hex');
        if(hash!==req.headers['Chapa-Signature']&&hash!==req.headers['x-chapa-signature']){
          res.status(400).json({status:"failed",message:"verification failed",data:[]});
        }
        const {event,tx_ref}=body;
        if(!tx_ref){
            res.status(400).json({ error: "Missing transaction reference" });
            return 
        }
        switch (event) {
            case "charge.success":
                console.log("successsssssssssssss")
             console.log( await updateStatus(tx_ref,"success"))
              break;
      
            case "charge.failed/cancelled":
                console.log("failedddddddddddd")
               await updateStatus(tx_ref,"failed");
              break;
      
            case "charge.pending":
             await updateStatus(tx_ref,"pending");
              break;
          }
          console.log(body);
          const responseBody={status:"success",message:"transaction verified successfully",data:{payload:{body}}}
     res.status(200).json(responseBody)
    }catch(error){
        next(new AppError("Error occured during verification of payment",400,"Operational",error))
    }
}