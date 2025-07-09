import { Router } from "express";

import { planController } from "../controllers/plan.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { planValidator } from "../validators/plan.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, planController.getAll);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    planController.getById,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(planValidator),
    planController.create,
);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(planValidator),
    planController.update,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    planController.delete,
);

export const planRouter = router;
