import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, authController.me);
router.put(
    "/edit",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(UserValidator.updateUser),
    authController.updateMe,
);

export const accountRouter = router;
