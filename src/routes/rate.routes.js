import { Router } from "express";
import { methods as ratesController } from "../controllers/Rates/rates.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/create", auth, ratesController.createRate);
router.get("/getAll", auth, ratesController.getRates);

export default router;
