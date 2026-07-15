import { Technology } from "../technologies";
import { classNames } from "../utils/class-names";
import styles from "./TechnologyGrid.module.css";
import { TechnologyGridItem } from "./TechnologyGridItem";

type TechnologyGridProps = {
  technologies: Technology[];
  className: string;
};
export const TechnologyGrid = ({
  technologies,
  className,
}: TechnologyGridProps) => {
  return (
    <div className={classNames(styles.technologyGrid, className)}>
      {technologies.map((technology) => (
        <TechnologyGridItem key={technology.name} {...technology} />
      ))}
    </div>
  );
};