export const getDiffString = (diffInMillis: number): string => {
  return new Date(diffInMillis).toISOString().slice(11, 19)
}
