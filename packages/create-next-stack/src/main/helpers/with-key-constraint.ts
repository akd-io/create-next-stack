/**
 * `withKeyConstraint` is a higher-order [Constrained Identity Function](https://kentcdodds.com/blog/how-to-write-a-constrained-identity-function-in-typescript)
 * used to restrict the keys of an object to the exact strings of a specified union type, while still getting the values of the object type accurately inferred from usage.
 *
 * Note: `withKeyConstraint` returns a function you'll want to call immediately, see example below.
 *
 * Sample usage:
 * ```typescript
 * type ExampleKey = "key1" | "key2"
 * const example = withKeyConstraint<ExampleKey>()({ // <-- Result of withKeyConstraint is called immediately
 *    key1: "test",
 *    key2: 13,
 *    //key3: () => void // Uncommenting this line would result in a type error, as key3 is not part of ExampleKey
 *  } as const)
 *
 *  // Correctly inferred values:
 *  example.key1 // type: "test"
 *  example.key2 // type: 13
 * ```
 */
export const withKeyConstraint = <TRequiredKeys extends string>() => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return <
    TObject extends {
      [Key in TRequiredKeys | keyof TObject]: Key extends TRequiredKeys
        ? unknown
        : never
    }
  >(
    object: TObject
  ) => object
}
