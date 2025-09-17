import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUsername);
router.delete("/:id", userController.delete);

export const userRouter = router;
