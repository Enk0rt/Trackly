import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// GET ALL USERS
router.get(
    "/",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.getUsers,
);

// BLOCK USER
router.patch(
    "/block/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.blockUser,
);

// BLOCK USER
router.patch(
    "/unblock/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.unblockUser,
);

// CHANGE ROLE
router.patch(
    "/promote/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.changeRole,
);

// DELETE USER
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.deleteUser,
);

export const adminRouter = router;
