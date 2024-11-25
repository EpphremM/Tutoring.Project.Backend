import { Router } from "express";
import { registration } from "../controllers/student.controller";

export class StudentRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
    this.router.route('/').post(registration);
    }
}