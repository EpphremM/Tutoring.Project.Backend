import { Router } from 'express';
import { registration } from '../controllers/transaction.controller';
export class TreansactionRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRouters();
    }
    setRouters(){
  this.router.route('/').post(registration);
    }
}