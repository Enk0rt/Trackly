import { Router } from "express";

import { habitHistoryController } from "../controllers/habit-history.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { streakMiddleware } from "../middleware/streak.middleware";
import { habitValidator } from "../validators/habit.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    streakMiddleware.checkHabitStreak,
    habitHistoryController.getAll,
);
router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitHistoryController.getById,
);
router.post(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    commonMiddleware.validateBody(habitValidator.history),
    habitHistoryController.create,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitHistoryController.delete,
);

export const habitHistoryRouter = router;
