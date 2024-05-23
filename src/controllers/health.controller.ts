import { NextFunction, Request, Response } from "express";

export const health = async (req: Request, res: Response, next: NextFunction) => {
    next({
        status: "running",
    })
}