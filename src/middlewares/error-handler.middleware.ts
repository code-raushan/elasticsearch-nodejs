/* eslint-disable no-console */
import { NextFunction, Request } from 'express';
import { CustomError } from '../errors/custom.error';
import { ResponseType } from '../types/response.type';
import logger from '../utils/logger';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 18);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export const globalHandler = (data: any, req: Request, res: ResponseType, next: NextFunction) => {
  if (data instanceof CustomError) {
    const errors = data.serializeErrors();
    const errorId = nanoid();
    const message = `route: ${req.path}, errorMsg: ${errors[0].message}, rayId: ${errorId}`;
    logger.error(message);
    return res.status(data.statusCode).send({
      errors,
      statusCode: data.statusCode,
      message,
      success: false
    });
  }

  if (data instanceof Error) {
    const statusCode = 500;
    const errorId = nanoid();
    const message = data.message;
    const errMesage = `route: ${req.path}, errorMsg: ${message}, rayId: ${errorId}`;
    logger.error(errMesage);
    return res.status(statusCode).json({
      errors: [
        {
          message
        }
      ],
      statusCode,
      message: errMesage,
      success: false
    });
  }


  if (data) {
    const msg = data.msg;
    if (data['msg']) {
      delete data['msg'];
    }
    const statusCode = data.statusCode || 200;
    if (data['statusCode']) {
      delete data['statusCode'];
    }
    return res.status(statusCode).send({
      data,
      statusCode: statusCode,
      message: msg,
      success: true
    });
  } else {
    const errorId = nanoid();
    return res.status(500).json({
      statusCode: 500,
      message: `route: ${req.path}, errorMsg: INTERNAL SERVER ERROR, rayId: ${errorId}`,
      success: false
    });
  }

  next();
};
