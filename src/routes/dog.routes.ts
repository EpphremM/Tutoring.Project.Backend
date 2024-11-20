import { Router } from "express";
import { createDog } from "../controllers/dog.controller";

const router = Router();

router.route('/').post(createDog);

export default router;