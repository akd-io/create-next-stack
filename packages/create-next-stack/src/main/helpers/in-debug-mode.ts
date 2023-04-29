export const inDebugMode = (): boolean => process.env["DEBUG"] === "true"
export const inTestMode = (): boolean => process.env["TEST"] === "true"
