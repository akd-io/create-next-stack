import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Section.module.css";

export const Section: FC<ComponentProps<"section">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section className={classNames(styles.section, className)} {...props}>
      {children}
    </section>
  );
};
