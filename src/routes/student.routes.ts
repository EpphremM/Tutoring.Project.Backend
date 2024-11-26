import { Router } from "express";
import { addSubject, findAll, findById, registration, update } from "../controllers/student.controller";

export class StudentRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
    this.router.route('/').post(registration).get(findAll);
    this.router.route('/:id').get(findById).patch(update);
    this.router.route('/addSubject').post(addSubject);
    }
}