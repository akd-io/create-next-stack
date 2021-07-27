import { ComponentProps, FC } from "react";
import styles from "./Section.module.css";

export const Section: FC<ComponentProps<"section">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section className={styles.section + " " + className} {...props}>
      <div className={styles.contentContainer}>{children}</div>
    </section>
  );
};
