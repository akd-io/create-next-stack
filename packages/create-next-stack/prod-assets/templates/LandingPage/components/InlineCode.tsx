import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./InlineCode.module.css";

export const InlineCode = ({
  className,
  ...props
}: ComponentProps<"code">) => {
  return (
    <code className={classNames(styles.inlineCode, className)} {...props} />
  );
};