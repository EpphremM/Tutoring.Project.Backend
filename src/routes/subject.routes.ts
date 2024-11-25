import { Router } from "express";
import { registration } from "../controllers/subject.controller";

export class SubjectRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
    this.router.route('/').post(registration);
    }
}