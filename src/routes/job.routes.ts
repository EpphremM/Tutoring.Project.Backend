import { Router } from "express";
import { JobRepository } from "../database/repositories/job.repository";
import {
  Delete,
  filter,
  findAll,
  findById,
  registration,
  update,
} from "../controllers/job.controller";

export class Jobroutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRoutes();
  }
  setRoutes() {
    this.router.route("/").post(registration).get(findAll);
    this.router.route("/filter").get(filter);
    this.router.route("/:id").get(findById).patch(update).delete(Delete);
  }
}
