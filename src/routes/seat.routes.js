import { Router } from "express";
import { methods as seatController } from "../controllers/Seats/seats.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/create", auth, seatController.createSeat);
router.put("/reserve/:id", auth, seatController.changeStatus);

export default router;
