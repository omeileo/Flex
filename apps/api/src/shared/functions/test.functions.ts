/**
 * Used for testing purposes.
 *
 * Replaces the placeholders in the given path with the corresponding values from the params object.
 *
 * @param path - The path string with placeholders.
 * @param params - An object containing key-value pairs for the placeholders.
 * @returns The updated path string with replaced placeholders.
 */
export function getTestPathWithParams<Params extends Record<string, object>>(path: string, params: Params): string {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, value.toString())
  }, path)
}

export type ResponseBody<T> = {
  status: number
  body: T
}
