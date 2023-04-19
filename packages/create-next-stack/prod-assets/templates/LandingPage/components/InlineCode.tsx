import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./InlineCode.module.css";

export const InlineCode: FC<ComponentProps<"code">> = ({
  className,
  ...props
}) => {
  return (
    <code className={classNames(styles.inlineCode, className)} {...props} />
  );
};
