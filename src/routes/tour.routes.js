import { Router } from "express";
import { methods as toursController } from "../controllers/Tours/tours.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/create", auth, toursController.createRoute);
router.get("/getAll", auth, toursController.getRoutes);

export default router;
