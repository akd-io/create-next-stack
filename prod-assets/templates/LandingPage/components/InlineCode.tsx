import { ComponentProps, FC } from "react";
import styles from "./Paragraph.module.css";

export const InlineCode: FC<ComponentProps<"code">> = ({
  className,
  ...props
}) => {
  return <code className={styles.inlineCode + " " + className} {...props} />;
};
