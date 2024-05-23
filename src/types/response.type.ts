import { Response } from 'express';

export interface IErrorFormat {
  message: string;
  field?: string;
}

export interface IResponseFormat {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message: string;
  errors?: IErrorFormat[];
  success: boolean;
}

export type ResponseType = Response<IResponseFormat>;
