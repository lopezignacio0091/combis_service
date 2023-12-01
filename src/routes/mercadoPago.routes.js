import { Router } from "express";
import { methods as mercadoPagoController } from "../controllers/MercadoPago/mercadoPago.controller";
import auth from "../utils/authToken";
const router = Router();

router.post("/createPreference", auth, mercadoPagoController.createPreference);

export default router;