import { Router } from 'express';
import { findAll, update } from '../controllers/transaction.controller';
import { registration } from '../controllers/transaction.controller';
import { findById } from '../controllers/transaction.controller';
export class TreansactionRoutes{
    public router:Router;
    constructor(){
        this.router=Router();
        this.setRouters();
    }
    setRouters(){
  this.router.route('/').post(registration).get(findAll);
  this.router.route('/:id').get(findById).patch(update);
    }
}