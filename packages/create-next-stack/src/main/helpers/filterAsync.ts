export const filterAsync = async <T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
): Promise<T[]> => {
  const verdicts = await Promise.all(array.map(predicate))
  return array.filter((_, index) => verdicts[index])
}
