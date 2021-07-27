import { ComponentProps, FC } from "react";
import styles from "./Title.module.css";

export const Title: FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return <h1 className={styles.title + " " + className} {...props} />;
};
