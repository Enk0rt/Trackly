import { Router } from "express";

import { accountRouter } from "./account.router";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/accounts", accountRouter);

export const apiRouter = router;
