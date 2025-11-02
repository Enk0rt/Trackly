import { Router } from "express";

import { habitController } from "../controllers/habit.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { streakMiddleware } from "../middleware/streak.middleware";
import { habitValidator } from "../validators/habit.validator";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    streakMiddleware.checkHabitStreak,
    habitController.getAll,
);

router.get(
    "/user/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    streakMiddleware.checkHabitStreak,
    habitController.getUserHabits,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    streakMiddleware.checkHabitStreak,
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

export const habitRouter = router;
