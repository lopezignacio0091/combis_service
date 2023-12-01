import { Router } from "express";
import { methods as driverController } from "../controllers/Driver/driver.controller";
import auth from "../utils/authToken";
const router = Router();

router.get("/getTrips/:id", auth, driverController.getTrips);
export default router;
