import type { Request,Response,NextFunction } from "express";
import { errorResponse } from "../utility/responses.js";

export function errorHandler(
    err:any,
    req: Request,
    res: Response,
    next: NextFunction
){
    console.log(err);
    errorResponse(err,500, "Internal Server Error");

}