import { ComponentProps, FC } from "react";
import styles from "./Paragraph.module.css";

export const Paragraph: FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return <p className={styles.paragraph + " " + className} {...props} />;
};
