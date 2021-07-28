export const classNames = (
  ...classNames: Array<string | undefined>
): string => {
  return classNames.filter((className) => className != null).join(" ");
};
