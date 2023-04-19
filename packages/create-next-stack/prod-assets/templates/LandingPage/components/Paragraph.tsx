import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Paragraph.module.css";

export const Paragraph: FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return <p className={classNames(styles.paragraph, className)} {...props} />;
};
