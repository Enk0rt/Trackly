import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { swaggerDocument, swaggerUi } from "./configs/swagger.config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api.error";
import { errorHandler } from "./middleware/error.middleware";
import { apiRouter } from "./routers/api.router";
import { delay } from "./utils/delay";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", apiRouter);
app.use(errorHandler);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("Connecting to Database...");
            await mongoose.connect(config.MONGO_DB_URI);
            dbCon = true;
            console.log("Connection is successful, Database available");
        } catch (e) {
            console.log("Database unavailable, retrying...", e);
            await delay(3000);
        }
    }
};

const start = async () => {
    const port = config.PORT;
    try {
        await dbConnection();
        app.listen(port, async () => {
            console.log(`Server is listening port ${port}`);
            await cronRunner();
        });
    } catch (e) {
        console.log(e);
    }
};

start();
