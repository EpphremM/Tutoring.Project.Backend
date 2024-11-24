import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dogRouter from "./src/routes/dog.routes";
import { FamilyRoutes } from "./src/routes/family.routes";
import { globalErrorHandler } from "./src/controllers/global.error.controller";
import { AppError } from "./src/express/error/app.error";
import { TutorRoutes } from "./src/routes/tutor.routes";
import { Jobroutes } from "./src/routes/job.routes";
import { TreansactionRoutes } from "./src/routes/transaction.routes";
import { ApplicationRoutes } from "./src/routes/application.routes";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }
  private initializeMiddleware() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    const familyRoutes = new FamilyRoutes();
    const tutorRoutes = new TutorRoutes();
    const jobRouter = new Jobroutes();
    const applicationRouter = new ApplicationRoutes();
    const transactionRouter = new TreansactionRoutes();
    this.app.use("/app/v1/family", familyRoutes.router);
    this.app.use("/app/v1/tutor", tutorRoutes.router);
    this.app.use("/app/v1/job", jobRouter.router);
    this.app.use("/app/v1/transaction", transactionRouter.router);
    this.app.use("/app/v1/application", applicationRouter.router);
    this.app.use("/dog", dogRouter);
    this.app.use(globalErrorHandler);
  }
}
export default new App().app;
