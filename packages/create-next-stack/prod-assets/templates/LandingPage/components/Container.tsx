import { ComponentProps } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Container.module.css";

type ContainerProps = ComponentProps<"div"> & {
  wide?: boolean;
  center?: boolean;
};

export const Container = ({
  wide = false,
  center = false,
  className,
  children,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        [styles.wide, wide],
        [styles.center, center],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};