import { Router } from "express";
import { findById, registration, update } from '../controllers/application.controller';

export class ApplicationRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRouter();
    }
    setRouter(){
        this.router.route("/").post(registration);
        this.router.route("/:id").get(findById).patch(update);
    }
}