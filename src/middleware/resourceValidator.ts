import { Request, Response } from "express";
import { responseHandler } from "./responseHandler";

/**
 * Throw an error if the resource is empty or not found
 * @param resource any
 * @returns Error | Response
 */
export const resourceValidator = (resource: any, message: string, req: Request, res: Response) => {
  if (!resource || resource === "" || resource.length === 0 || resource === null) {
    throw new Error(message);
  }

  if (resource instanceof Error) {
    throw new Error(resource.message);
  }

  return responseHandler(resource, req, res);
};