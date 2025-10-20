import { Router } from "express";

import { habitController } from "../controllers/habit.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { habitValidator } from "../validators/habit.validator";
import { habitHistoryRouter } from "./habit-history.router";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, habitController.getAll);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitController.getById,
);
router.post(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    commonMiddleware.validateBody(habitValidator.habit),
    habitController.create,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitController.delete,
);

router.use("/history", habitHistoryRouter);
export const habitRouter = router;
