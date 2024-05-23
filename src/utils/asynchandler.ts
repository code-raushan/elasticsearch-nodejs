import { getLogDataFromReqObject } from './logger/index';
import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import { BadRequestError } from '../errors/bad-request.error';
import { ForbiddenError } from '../errors/forbidden.error';
import { NotFoundError } from '../errors/not-found.error';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { UnprocessableError } from '../errors/unprocessable.error';
import { InternalServerError } from '../errors/internal-server.error';
import { TooManyRequestsError } from '../errors/too-many-request.error';
import { ErrorButOkError } from '../errors/error-but-ok.error';
import { ConflictErrorJSON } from '../errors/conflict-custom.error';

export const asyncHandler = (fnc: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
  return Promise.resolve(fnc(req, res, next)).catch((err) => {
    const reqObjectData = getLogDataFromReqObject(req);
    logger.error(`${reqObjectData} , Message -  ${JSON.stringify(err)}, Err - ${err}`);
    // config.ENV === 'development' && console.log(err);
    let status = 500;
    let error = err.message;
    let data;
    if (err instanceof BadRequestError) {
      status = 400;
    }
    else if (err instanceof NotFoundError) {
      status = 404;
    }
    else if (err instanceof UnauthorizedError) {
      status = 401;
    }
    else if (err instanceof ForbiddenError) {
      status = 403;
    }
    else if (err instanceof UnprocessableError) {
      status = 422;
    }
    else if (err instanceof InternalServerError) {
      status = 500;
    }
    else if (err instanceof TooManyRequestsError) {
      status = 429;
    }
    else if (err instanceof ErrorButOkError) {
      status = 200;
    }
    else if (err instanceof ConflictErrorJSON) {
      status = 409;
      data = JSON.parse(err.message);
      error = 'Conflict Occured';
    }
    else {
      error = 'Something Unexpected Happend';
    }

    // try {
    //   // req.metrics.endTime = new Date();
    //   // const responseTimeInMs = (req.metrics.endTime.getTime() - req.metrics.startTime.getTime());
    //   // console.log(responseTimeInMs)
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   logger.warn(`Response Time Tracker Error - ${error.message}`);
    // }

    return res.status(status).json({
      error: error,
      data
    });
  });
};
