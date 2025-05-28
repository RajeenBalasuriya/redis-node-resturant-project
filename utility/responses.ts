import type { Response } from "express";

export function sucessResponse(
  res: Response,
  data: any,
  message: string = "Sucess"
) {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
}

export function errorResponse(res: Response, status: number, error: string) {
  return res.status(status).json({
    status: "error",
    message: error,
  });
}
