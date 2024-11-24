import { Router } from "express";
import { registration } from "../controllers/application.controller";

export class ApplicationRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRouter();
    }
    setRouter(){
        this.router.route("/").post(registration);
    }
}