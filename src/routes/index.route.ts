import { Router } from "express";
import { health } from "../controllers/health.controller";
import { helloWorld } from "../controllers/root.controller";
import { asyncHandler } from "../utils/asynchandler";

const v1Router = Router();

v1Router.get("/", asyncHandler(helloWorld));
v1Router.get("/health", asyncHandler(health));

export default v1Router;