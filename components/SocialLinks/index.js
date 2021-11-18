import SocialLinksStyles from "@styles/SocialLinks.module.css";
import { GitHub } from "./svgs/github";
import { LinkedIn } from "./svgs/linkedin";
import { Config } from "@utils/Config";

const socialLinksList = [
  {
    name: "GitHub",
    url: `https://github.com/${Config.pageMeta.openGraph.githubUser}`,
    ariaLabel: "Check out my GitHub",
    svg: <GitHub />,
  },
  {
    name: "LinkedIn",
    url: `https://linkedin.com/in/${Config.pageMeta.openGraph.linkedInUser}`,
    ariaLabel: "Connect with me on LinkedIn",
    svg: <LinkedIn />,
  },
];

export default function SocialLinks(props) {
  const { fillColor } = props;

  return (
    <div className={SocialLinksStyles.socialLinks}>
      <ul className={SocialLinksStyles.socialLinks__list}>
        {socialLinksList.map((link) => (
          <li
            className={SocialLinksStyles.socialLinks__listItem}
            key={link.name}
          >
            <a
              className={SocialLinksStyles.socialLinks__listItemLink}
              style={{ color: fillColor }}
              href={link.url}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="nofollow noreferrer"
            >
              {link.svg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
