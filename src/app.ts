import express, { NextFunction, Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cors from "cors";
import { NotFoundError } from "./errors/not-found.error";
import { globalHandler } from "./middlewares/error-handler.middleware";
import rootRouter from "./routes/index.route";
import { asyncHandler } from "./utils/asynchandler";
import logger from "./utils/logger";
import { getLocalIP } from "./utils/system.util";

const app = express();
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", "src/views");


app.use(express.json());

app.use(cors());

app.use("/", rootRouter);

app.get("/favicon.ico", (req, res) => res.status(204).end());

export const notFound = () => {
    throw new NotFoundError("Route not found");
};
app.use("*", asyncHandler(notFound));

app.use((
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    data: any, req: Request, res: Response, next: NextFunction
) => {
    globalHandler(data, req, res, next);
});

logger.info(`Local IP - ${getLocalIP()}`);

export default app;
