import { Router } from "express";

import { accountRouter } from "./account.router";
import { adminRouter } from "./admin.router";
import { authRouter } from "./auth.router";
import { planRouter } from "./plan.router";
import { userRouter } from "./user.router";
import { userActivityRouter } from "./user-activity.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/accounts", accountRouter);
router.use("/plans", planRouter);
router.use("/activity", userActivityRouter);
router.use("/admin", adminRouter);

export const apiRouter = router;
