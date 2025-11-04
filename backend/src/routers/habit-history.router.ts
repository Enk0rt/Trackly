import { Router } from "express";

import { habitHistoryController } from "../controllers/habit-history.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { streakMiddleware } from "../middleware/streak.middleware";
import { habitValidator } from "../validators/habit.validator";

const router = Router();

// RECEIVE ALL HABIT HISTORY ENTRIES
router.get(
    "/",
    authMiddleware.checkAccessToken,
    streakMiddleware.checkHabitStreak,
    habitHistoryController.getAll,
);
// RECEIVE ONE HABIT HISTORY ENTRY BY ID
router.get(
    "/entry/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitHistoryController.getHabitHistoryEntryById,
);
// RECEIVE ALL HABIT HISTORY ENTRIES BY HABIT ID
router.get(
    "/all/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitHistoryController.getHabitHistoryById,
);
// RECEIVE USER WEEKLY CHECKS
router.get(
    "/checks",
    authMiddleware.checkAccessToken,
    habitHistoryController.getHabitChecks,
);
// CREATE HABIT HISTORY ENTRY
router.post(
    "/create/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    commonMiddleware.validateBody(habitValidator.history),
    habitHistoryController.create,
);
// DELETE HABIT HISTORY ENTRY BY ID
router.delete(
    "/delete/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isValidated("id"),
    habitHistoryController.delete,
);

export const habitHistoryRouter = router;
