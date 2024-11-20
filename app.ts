import 'reflect-metadata'
import express, { Application, Request, Response } from "express";
import dogRouter from './src/routes/dog.routes';
import { FamilyRoutes } from './src/routes/family.routes';
import { globalErrorHandler } from './src/controllers/global.error.controller';
import { AppError } from './src/express/error/app.error';
import { TutorRoutes } from './src/routes/tutor.routes';

class App{
  public app:Application;
  constructor(){
    this.app= express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }
  private initializeMiddleware(){
    this.app.use(express.json());
  }
  
  private initializeRoutes(){
    const familyRoutes=new FamilyRoutes();
    const tutorRoutes=new TutorRoutes();
    this.app.use("/app/v1/family",familyRoutes.router)
    this.app.use('/app/v1/tutor',tutorRoutes.router)
    this.app.use("/dog",dogRouter);
    this.app.use(globalErrorHandler)
  }
}
export default new App().app;

