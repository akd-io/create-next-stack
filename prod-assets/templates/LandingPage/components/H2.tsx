import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./H2.module.css";

export const H2: FC<ComponentProps<"h2">> = ({ className, ...props }) => {
  return <h2 className={classNames(styles.h2, className)} {...props} />;
};
