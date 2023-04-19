type KeyToKeyMap<T extends Record<string, unknown>> = {
  [value in keyof T]: value
}

export const objectToKeyToKeyMap = <T extends Record<string, unknown>>(
  object: T
): KeyToKeyMap<T> => {
  const keyToKeyMap: { [key: string]: string } = {}

  for (const key of Object.keys(object)) {
    keyToKeyMap[key] = key
  }

  return keyToKeyMap as KeyToKeyMap<T>
}
