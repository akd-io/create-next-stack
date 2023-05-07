import { FC } from "react";
import { H3 } from "./headings";
import { Link } from "./Link";
import { Paragraph } from "./Paragraph";
import styles from "./TechnologyGridItem.module.css";

type TechnologyGridItemProps = {
  name: string;
  description: string;
  links: Array<{
    title: string;
    url: string;
  }>;
};
export const TechnologyGridItem: FC<TechnologyGridItemProps> = ({
  name,
  description,
  links,
}) => {
  return (
    <div className={styles.technologyGridItem}>
      <H3>{name}</H3>
      <Paragraph>{description}</Paragraph>
      <div className={styles.linksContainer}>
        {links.map((link, index) => (
          <Link key={index} href={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
