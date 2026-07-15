import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Section.module.css";

export const Section = ({
  className,
  children,
  ...props
}: ComponentProps<"section">) => {
  return (
    <section className={classNames(styles.section, className)} {...props}>
      {children}
    </section>
  );
};