import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./headings.module.css";

export const H1 = ({ className, ...props }: ComponentProps<"h1">) => {
  return <h1 className={classNames(styles.h1, className)} {...props} />;
};

export const H2 = ({ className, ...props }: ComponentProps<"h2">) => {
  return <h2 className={classNames(styles.h2, className)} {...props} />;
};

export const H3 = ({ className, ...props }: ComponentProps<"h3">) => {
  return <h3 className={classNames(styles.h3, className)} {...props} />;
};

export const H4 = ({ className, ...props }: ComponentProps<"h4">) => {
  return <h4 className={classNames(styles.h4, className)} {...props} />;
};