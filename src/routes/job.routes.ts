import { Router } from "express";
import { JobRepository } from '../database/repositories/job.repository';
import { registration } from "../controllers/job.controller";

export class Jobroutes{
    public router:Router
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
       this.router.route('/').post(registration);
    }
}