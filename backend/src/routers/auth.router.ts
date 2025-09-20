import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { commonMiddleware } from "../middleware/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

// REGISTER
router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.createUser),
    authController.signUp,
);

// LOGIN
router.post(
    "/sign-in",
    commonMiddleware.validateBody(AuthValidator.signIn),
    authController.signIn,
);

// RECEIVE AUTH USER
router.get("/me", authMiddleware.checkAccessToken, authController.me);

// REFRESH TOKENS
router.get(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

// LOGOUT USER
router.post("/logout", authController.logout);

// REQUEST FOR EMAIL VERIFICATION FROM FRONT
router.post(
    "/verify/email",
    authMiddleware.checkAccessToken,
    authController.sendVerifyEmailRequest,
);

// VERIFICATION CONFIRM
router.get("/verify/confirm/:token", authController.verifyEmail);

// REQUEST FOR PASSWORD RECOVERY
router.post("/recovery/password", authController.sendRecoveryRequest);

// RECOVERY CONFIRM FROM EMAIL
router.get(
    "/recovery/confirm/:token",
    authController.validatePasswordRecoveryToken,
);

router.patch(
    "/recovery/confirm/:token",
    authController.recoverPasswordFromEmail,
);

// PASSWORD CHANGE FROM PROFILE
router.put(
    "/password",
    authMiddleware.checkAccessToken,
    authController.changePasswordFromProfile,
);

export const authRouter = router;
