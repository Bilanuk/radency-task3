import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

import dotenv from 'dotenv';
dotenv.config();

export function catchError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await originalMethod.call(this, req, res, next);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: error.errors });
      }

      if (process.env.NODE_ENV === "development") {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  };

  return descriptor;
}
