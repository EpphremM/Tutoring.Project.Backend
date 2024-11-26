import { Router } from "express";
import {
  registration,
  findById,
  update,
  applyJob,
  Delete,
} from "../controllers/tutor.controller";
import { findAll } from "../controllers/tutor.controller";
export class TutorRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.setRoutes();
  }
  setRoutes() {
    this.router.route("/").post(registration).get(findAll);
    this.router.route("/apply").post(applyJob);
    this.router.route("/:id").get(findById).patch(update).patch(update).delete(Delete);
  }
}
