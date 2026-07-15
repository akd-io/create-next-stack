import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Link.module.css";

type LinkProps = ComponentProps<"a">;
export const Link = ({ className, ...restProps }: LinkProps) => {
  return <a className={classNames(styles.link, className)} {...restProps} />;
};