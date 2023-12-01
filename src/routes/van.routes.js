import { Router } from "express";
import { methods as vanController } from "../controllers/Vans/vans.controller";
import auth from "../utils/authToken";
const router = Router();
router.post("/create", auth, vanController.createVan);
router.get("/getAndSeatsById/:id", auth, vanController.getVansAndSeatsById);

export default router;
