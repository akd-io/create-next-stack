import { ComponentProps, FC } from "react";
import { classNames } from "../utils/class-names";
import styles from "./Container.module.css";

type ContainerProps = ComponentProps<"div"> & {
  wide?: boolean;
  center?: boolean;
};

export const Container: FC<ContainerProps> = ({
  wide = false,
  center = false,
  className,
  children,
  ...props
}) => {
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
