import { Schema, ZodAny } from "zod";
import { AppError } from "../../express/error/app.error";
import { ZodSchema } from "zod";

export const inputValidate=(schema:ZodSchema,body)=>{
    try{
      const result=schema.safeParse(body);
      if(result.success){
        return{status:true,data:result.data}
      }else{
     const errors=result.error.errors.map((err)=>({
        path:err.path.join('.'),
        message:err.message
     }))
     return {status:false,errors}
      }
    }catch(error){
        new AppError("validation cancelled",400,"validation error",error)
    }
}