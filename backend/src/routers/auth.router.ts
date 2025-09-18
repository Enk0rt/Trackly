import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.createUser),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.validateBody(AuthValidator.signIn),
    authController.signIn,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.get(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.post("/logout", authController.logout);

router.post(
    "/verify/email",
    authMiddleware.checkAccessToken,
    authController.sendVerifyEmailRequest,
);
router.get("/verify/confirm/:token", authController.verifyEmail);

export const authRouter = router;
