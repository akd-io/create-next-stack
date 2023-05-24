import { logDebug } from "../logging"

/**
 * Compares two string values by their order in an array.
 * @param a a string value
 * @param b a string value
 * @param order an array of string values specifying the order
 * @returns a negative number if `a` comes before `b` in `order`, a positive number if `b` comes before `a` in `order`, or `0` if `a` and `b` are equal in `order` or if either `a` or `b` are not in `order`
 */
export const compareByOrder = (a: string, b: string, order: string[]) => {
  const aIndex = order.indexOf(a)
  const bIndex = order.indexOf(b)
  if (aIndex === -1 || bIndex === -1) {
    logDebug(
      `WARNING: One or both of the values being compared are not in the order array. This should be caught by a test.`
    )
    return 0
  }
  return aIndex - bIndex
}
