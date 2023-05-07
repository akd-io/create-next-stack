export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
