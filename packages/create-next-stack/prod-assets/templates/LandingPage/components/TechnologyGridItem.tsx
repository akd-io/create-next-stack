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
export const TechnologyGridItem = ({
  name,
  description,
  links,
}: TechnologyGridItemProps) => {
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