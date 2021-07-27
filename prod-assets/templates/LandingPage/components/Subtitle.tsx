import { ComponentProps, FC } from "react";
import styles from "./Subtitle.module.css";

export const Subtitle: FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return <p className={styles.subtitle + " " + className} {...props} />;
};
