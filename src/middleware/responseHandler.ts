import { Request, Response } from "express";

/**
 * Reponse Handler for all HTTP methods
 * @param resource any
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const responseHandler = (resource: any, req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ statusCode: 200, data: resource });
    case "DELETE":
      return res.status(204).json({ statusCode: 204, message: "Resource deleted successfully" });
    case "POST":
      return res.status(201).json({ statusCode: 201, data: resource });
    case "PUT":
      return res.status(200).json({ statusCode: 200, message: "Resource updated successfully", data: resource });
    case "PATCH":
      return res.status(200).json({ statusCode: 200, message: "Resource updated successfully", data: resource });
    default:
      return res.status(200).json({ statusCode: 200, data: resource });
  }
};