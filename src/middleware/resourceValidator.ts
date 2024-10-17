
/**
 * Throw an error if the resource is empty or not found
 * @param resource any
 * @returns Error
 */
export const resourceValidator = (resource: any) => {
  if (!resource || resource === "" || resource.length === 0 || resource === null) {
    throw new Error("Resource not found");
  }
}