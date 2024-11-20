import { ZodSchema } from "zod";
import {Request,Response,NextFunction} from 'express';
import { AppError } from "../../express/error/app.error";
export const inputValidate=(schema:ZodSchema,body:any)=>{
try{
 const result=schema.safeParse(body);
 if(result.success){
    return{status:true,data:result.data}
 }else{
    const errors=result.error.errors.map((err)=>({
      path:err.path.join('.'),
      message:err.message
    }));
    return {status:false,errors};
 }
}catch(error){
   new AppError("validation cancelled",400,error,"validation error");
}}