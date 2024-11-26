import { Router } from "express";
import { Delete, findAll, findById, registration, update } from '../controllers/application.controller';

export class ApplicationRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRouter();
    }
    setRouter(){
        this.router.route("/").post(registration).get(findAll);
        this.router.route("/:id").get(findById).patch(update).delete(Delete);
    }
}