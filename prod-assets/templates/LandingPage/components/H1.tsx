import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./H1.module.css";

export const H1: FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return <h1 className={classNames(styles.h1, className)} {...props} />;
};
