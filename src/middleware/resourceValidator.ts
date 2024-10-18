import { Request, Response } from "express";
import { validate } from "class-validator";

/**
 * Throw an error if the resource is empty or not found
 * @param resource any
 * @returns Error | Response
 */
export const resourceValidator = (resource: any, message: string, req: Request, res: Response) => {
  if (!resource || resource === "" || resource.length === 0 || resource === null) {
    throw new Error(message);
  } else {
    switch (req.method) {
      case "DELETE":
        return res.status(204).json({ message: "Resource deleted" });
      case "GET":
        return res.status(200).json(resource);
      case "POST":
        return res.status(201).json(resource);
      case "PUT":
        return res.status(200).json(resource);
      default:
        return res.status(200).json(resource);
    }
  }
};

/**
 * Validate the request data
 * @param data 
 */
export const validateRequest = async (data: any) => {
  const errors = await validate(data);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
}
