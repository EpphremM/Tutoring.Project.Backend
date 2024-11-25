import { Router } from "express";

export class SubjectRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
    this.router.route('/');
    }
}