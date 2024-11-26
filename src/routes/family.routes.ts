import { Router } from "express";
import { Delete, findById, registration } from "../controllers/family.controller";
import { findAll } from "../controllers/family.controller";
import {update} from "../controllers/family.controller";
export class FamilyRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRoutes();
  }
  private setRoutes() {
    this.router.route("/").get(findAll).post(registration);
    this.router.route("/:id").get(findById).patch(update).delete(Delete);
  }
}
