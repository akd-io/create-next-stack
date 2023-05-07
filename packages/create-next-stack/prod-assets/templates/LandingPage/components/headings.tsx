import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./headings.module.css";

export const H1: FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return <h1 className={classNames(styles.h1, className)} {...props} />;
};

export const H2: FC<ComponentProps<"h2">> = ({ className, ...props }) => {
  return <h2 className={classNames(styles.h2, className)} {...props} />;
};

export const H3: FC<ComponentProps<"h3">> = ({ className, ...props }) => {
  return <h3 className={classNames(styles.h3, className)} {...props} />;
};

export const H4: FC<ComponentProps<"h4">> = ({ className, ...props }) => {
  return <h4 className={classNames(styles.h4, className)} {...props} />;
};
