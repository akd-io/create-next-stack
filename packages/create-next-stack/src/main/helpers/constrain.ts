/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * Generic constrained identity function (CIF) by Kent C. Dodds
 *
 * For a lesson on constrained identity functions and this generic version, see the blog post linked below.
 *
 * When TypeScript 4.9.0 is supported, we'll be able to use `satisfies` instead of this generic CIF.
 *
 * @see https://kentcdodds.com/blog/how-to-write-a-constrained-identity-function-in-typescript#a-generic-cif
 */
export const constrain =
  <Given extends unknown>() =>
  <Inferred extends Given>(item: Inferred) =>
    item
