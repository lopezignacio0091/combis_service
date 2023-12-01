import { Router } from "express";
import { methods as reservesController } from "../controllers/Reserves/reserves.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/create", auth, reservesController.createReserve);
router.get("/getById/:id", auth, reservesController.getByUser);
router.put("/setStatus/:id", auth, reservesController.setStatus);

export default router;