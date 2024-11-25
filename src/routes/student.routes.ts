import { Router } from "express";

export class SutudentRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRoutes();
    }
    setRoutes(){
    this.router.route('/');
    }
}