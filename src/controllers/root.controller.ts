import { NextFunction, Request, Response } from "express";
import os from "os";
//@ts-ignore
import { default as pjson } from "../../package.json";
import config from "../config";


const instanceRandomID = Math.random().toString();
export const helloWorld = (req: Request, res: Response, next: NextFunction) => {
    let all = {};
    if (req.query.all) {
        all = { ...all, totalmem: os.totalmem() / 1000000000, freemem: os.freemem() / 1000000000 };
    }
    next({
        message: "Hello from elastic-search-nodejs-server",
        env: config.NODE_ENV,
        instance: instanceRandomID,
        version: pjson.version,
        all
    });
};