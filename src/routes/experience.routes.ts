import { Router } from "express";
import { Delete, findAll, findById, registration, update } from "../controllers/experience.controller";

export class ExperienceRoutes{
    public router:Router;
    constructor(){
        this.router=Router()
        this.setRoutes();
    }
    setRoutes(){
        this.router.route('/').post(registration).get(findAll);
        this.router.route('/:id').patch(update).get(findById).delete(Delete);
    }
}