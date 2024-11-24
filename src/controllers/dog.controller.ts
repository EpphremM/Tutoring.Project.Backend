import { NextFunction, Request, Response } from "express";
import { DogRepository } from "../database/repositories/dog.repository";
import { globalErrorHandler } from "./global.error.controller";
import { AppError } from "../express/error/app.error";
const dogRepo = new DogRepository();

export const createDog = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const body = req.body;
        const dog = await dogRepo.create(body);
        res.status(200).json({
            status: "success",
            data: {
                dog
            }
        })
    }catch(error){
        next(new AppError("Error occurred.", 404, "operational",error));
    }
   
}