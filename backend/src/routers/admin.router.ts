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

// BLOCK ONE USER
router.patch(
    "/block/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.blockOneUser,
);

// BLOCK MANY USERs
router.patch(
    "/block",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.blockManyUsers,
);

// UNBLOCK USER
router.patch(
    "/unblock/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.unblockOneUser,
);

// UNBLOCK USER
router.patch(
    "/unblock",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.unblockManyUsers,
);

// CHANGE ROLE
router.patch(
    "/promote/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.changeRole,
);

// DELETE ONE USER
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.deleteOneUser,
);

// DELETE MANY USERS
router.post(
    "/bulk-delete",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    adminController.deleteManyUsers,
);

export const adminRouter = router;
