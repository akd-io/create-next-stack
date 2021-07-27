export const minutesToMilliseconds = (minutes: number): number => {
  const seconds = minutes * 6
  const milliseconds = seconds * 1000
  return milliseconds
}
