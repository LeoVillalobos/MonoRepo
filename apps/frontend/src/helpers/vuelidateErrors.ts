import type { ErrorObject } from "@vuelidate/core";

/**
 *
 * @param errors
 * @returns
 */
const returnValue = (errors: ErrorObject[]): string | string[] => errors.map((e) => e.$message as string);

export { returnValue };
