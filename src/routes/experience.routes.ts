import { Router } from "express";
import { registration } from "../controllers/experience.controller";

export class ExperienceRoutes{
    public router:Router;
    constructor(){
        this.router=Router()
        this.setRoutes();
    }
    setRoutes(){
        this.router.route('/').post(registration);
    }
}