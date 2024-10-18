
/**
 * Throw an error if the resource is empty or not found
 * @param resource any
 * @returns Error
 */
export const resourceValidator = (resource: any, message: string) => {
  if (!resource || resource === "" || resource.length === 0 || resource === null) {
    throw new Error(message);
  }
}