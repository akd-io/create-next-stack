type KeyToKeyMap<T extends string> = { [value in T]: value }

export const arrayToKeyToKeyMap = <T extends string>(
  array: readonly T[]
): KeyToKeyMap<T> => {
  const keyToKeyMap: { [key: string]: string } = {}

  for (const value of array) {
    keyToKeyMap[value] = value
  }

  return keyToKeyMap as KeyToKeyMap<T>
}
