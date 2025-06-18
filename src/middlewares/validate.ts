import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import type { Params } from "../interfaces/params.interface.js";
export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request<Params>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
       res
        .status(400)
        .json({ success: false, errors: result.error.errors });

        return;
    }
    next();
  };