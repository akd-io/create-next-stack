export const classNames = (
  ...classNames: Array<string | undefined | [string, any]>
): string => {
  return classNames
    .filter((className) => {
      if (Array.isArray(className)) {
        return className[1];
      } else {
        return className != null;
      }
    })
    .map((className) => {
      if (Array.isArray(className)) {
        return className[0];
      } else {
        return className;
      }
    })
    .join(" ");
};
