import { Router } from "express";
import { Delete, findAll, update } from "../controller/transaction.controller";
import { registration } from "../controller/transaction.controller";
import { findById } from "../controller/transaction.controller";
import { deposit } from "../deposit";
export class TreansactionRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRouters();
  }
  setRouters() {
    this.router.route("/").post(deposit).get(findAll);
    this.router.route("/:id").get(findById).patch(update).delete(Delete);
  }
}
