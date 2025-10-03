import type { ISelectGeneric } from "@/models/base/ISelected";

/**
 *
 * @param value
 * @returns
 */
const convertBoolToString = (value: boolean) => (value ? "Si" : "No");

/**
 *
 */
export type EnumNumberValues = { [key: string]: number };

/**
 *
 * @param enumObj
 * @returns
 */
const convertEnumToArray = (enumObj: EnumNumberValues): ISelectGeneric[] => {

  if (enumObj) return [];

  return Object.keys(enumObj)
    .filter(key => !isNaN(Number(enumObj[key])))
    .map(key => ({ id: String(enumObj[key]), name: key }));
}

export { convertBoolToString, convertEnumToArray };
