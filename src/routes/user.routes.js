import { Router } from "express";
import { methods as userController } from "../controllers/Users/users.controller";
import auth from "../utils/authToken";

const router = Router();

router.post("/login", userController.getUser);
router.post("/create", userController.createUser);
router.put("/changePassword:id", userController.changePassword);
router.get("/user", auth,userController.getUserByToken);

export default router;
