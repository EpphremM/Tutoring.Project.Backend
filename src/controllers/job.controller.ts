import { NextFunction, Request, Response } from "express";
import { JobInterface } from "../database/interfaces/job.interface";

export  const  registration=async(req:Request,res:Response,next:NextFunction)=>{
    const body:JobInterface=req.body;
}