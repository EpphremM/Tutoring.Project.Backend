import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dogRouter from "./src/routes/dog.routes";
import { FamilyRoutes } from "./src/routes/family.routes";
import { globalErrorHandler } from "./src/controllers/global.error.controller";
import { TutorRoutes } from "./src/routes/tutor.routes";
import { Jobroutes } from "./src/routes/job.routes";
import { TreansactionRoutes } from "./src/payment/routers/transaction.routes";
import { ApplicationRoutes } from "./src/routes/application.routes";
import { SubjectRoutes } from "./src/routes/subject.routes";
import { StudentRoutes } from "./src/routes/student.routes";
import { ExperienceRoutes } from "./src/routes/experience.routes";
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
    const jobRoutes = new Jobroutes();
    const applicationRoutes = new ApplicationRoutes();
    const transactionRoutes = new TreansactionRoutes();
    const subjectRoutes = new SubjectRoutes();
    const studentRoutes = new StudentRoutes();
    const experienceRoutes = new ExperienceRoutes();
    this.app.use("/app/v1/family", familyRoutes.router);
    this.app.use("/app/v1/tutor", tutorRoutes.router);
    this.app.use("/app/v1/job", jobRoutes.router);
    this.app.use("/app/v1/transaction", transactionRoutes.router);
    this.app.use("/app/v1/application", applicationRoutes.router);
    this.app.use("/app/v1/student", studentRoutes.router);
    this.app.use("/app/v1/subject", subjectRoutes.router);
    this.app.use("/app/v1/experience", experienceRoutes.router);
    this.app.use("/dog", dogRouter);
    this.app.use(globalErrorHandler);
  }
}
export default new App().app;
