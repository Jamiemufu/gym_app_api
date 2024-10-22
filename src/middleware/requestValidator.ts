import { validate } from "class-validator";

/**
 * Remove white spaces and split string by comma
 * @param data 
 * @returns Array<string>
 */
export const splitRequestParams = (data: string) => {

  if (!data) {
    return [];
  }
  
  data = data.trim().replace(/\s/g, "");
  return data.includes("&") ? data.split("&") : data.split(",");
}

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