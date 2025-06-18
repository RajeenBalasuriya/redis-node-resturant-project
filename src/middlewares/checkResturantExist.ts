import type { Request, Response, NextFunction } from "express";
import { intializeRedisClient } from "../utils/client.js";
import { getRestaurantKey } from "../utils/keys.js";
import { errorResponse } from "../utility/responses.js";
import type { Params } from "../interfaces/params.interface.js";

export const checkResturantExists = async (
  req: Request<Record<string, any>>,
  res: Response,
  next: NextFunction
) => {
  
  const { resturantId } = req.params;

  if (!resturantId) {
    errorResponse(res, 400, "Resturant ID Not Found");
    return;
  }
  const client = await intializeRedisClient();
  const resturantKey = getRestaurantKey(resturantId);
  //check a particular key exists in redis db
  const exists = await client.exists(resturantKey);

  if (!exists) {
    errorResponse(res, 404, "Resturant Not Found");
    return;
  }
  next();
};
