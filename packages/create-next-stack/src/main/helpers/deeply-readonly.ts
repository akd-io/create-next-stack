export type DeeplyReadonly<T> = T extends unknown[]
  ? DeeplyReadonlyArray<T[number]>
  : T extends Record<string, unknown>
  ? DeeplyReadonlyObject<T>
  : T

export type DeeplyReadonlyArray<T> = ReadonlyArray<DeeplyReadonly<T>>

export type DeeplyReadonlyObject<T> = {
  readonly [P in keyof T]: DeeplyReadonly<T[P]>
}
