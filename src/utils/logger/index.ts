import { Request } from 'express-validator/src/base';
import developmentLogger from './development';

export const getLogDataFromReqObject = (req: Request): string => {
  try {
    if (!req) return '(request object data Not Found)';
    const ip = req.headers?.['x-forwarded-for'] || req.ip || req.socket['remoteAddress'];
    const userId = req.user?._id;
    const path = req.path;
    const params = JSON.stringify(req.params);
    const query = JSON.stringify(req.query);
    const body = { ...req.body };
    delete body?.password; //sensitive data which should not be logged
    delete body?.secretKey; //sensitive data which should not be logged
    delete body?.confirmPassword; //sensitive data which should not be logged
    delete body?.token; //sensitive data which should not be logged
    delete body?.authProviderToken; //sensitive data which should not be logged
    delete body['g-recaptcha-response']; //not needed
    return `IP - ${ip}, UserId - ${userId}, Path - ${path}, Body - ${JSON.stringify(body)}, Params - ${params}, Query - ${query}`;
  } catch (error) {
    logger.error(`getLogDataFromReqObject function error - ${error}`);
    return '(request object data Not Found)';
  }
};

const logger = developmentLogger;
export default logger;