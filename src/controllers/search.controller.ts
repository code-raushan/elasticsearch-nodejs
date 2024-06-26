import { NextFunction, Request, Response } from "express";
import searchService from "../services/search.service";

export const search = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string;
  const index = req.query.index as string;
  const response = await searchService.search({ index, query });

  next(response);
}