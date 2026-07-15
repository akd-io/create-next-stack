import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Subtitle.module.css";

export const Subtitle = ({ className, ...props }: ComponentProps<"p">) => {
  return <p className={classNames(styles.subtitle, className)} {...props} />;
};