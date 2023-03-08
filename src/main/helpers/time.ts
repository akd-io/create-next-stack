export const time = async (fn: () => Promise<void>): Promise<number> => {
  const startTime = Date.now()
  await fn()
  const endTime = Date.now()
  return endTime - startTime
}
