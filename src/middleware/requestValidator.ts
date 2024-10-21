/**
 * Remove white spaces and split string by comma
 * @param data 
 * @returns Array<string>
 */
export const splitRequestParams = (data: string) => {

  if (!data) {
    throw new Error("Invalid request");
  }
  
  data = data.trim().replace(/\s/g, "");
  return data.includes("&") ? data.split("&") : data.split(",");
}