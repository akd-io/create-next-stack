import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Paragraph.module.css";

export const Paragraph = ({ className, ...props }: ComponentProps<"p">) => {
  return <p className={classNames(styles.paragraph, className)} {...props} />;
};