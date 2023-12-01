import { Router } from "express";
import { methods as schedulesController } from "../controllers/Schedules/schedules.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/create", auth, schedulesController.createSchedule);
router.get("/getAll", auth, schedulesController.getSchedules);

export default router;
