import { Router } from "express";

import { accountRouter } from "./account.router";
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

export const apiRouter = router;
