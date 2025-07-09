import { Router } from "express";

import { userActivityController } from "../controllers/user-activity.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userActivityController.getAll);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    userActivityController.getById,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    userActivityController.delete,
);

export const userActivityRouter = router;
