import ContentfulImage from "@components/ContentfulImage";
import SocialLinks from "@components/SocialLinks";
import HeaderStyles from "@styles/Header.module.css";
import { Config } from "@utils/Config";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ assets }) {
  const router = useRouter();
  const headerImage = assets.find(
    (asset) => asset.sys.id === "rImaN1nOhnl7aJ4OYwbOp",
  );

  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.header__logoContainer}>
        <Link
          href="/"
          className={HeaderStyles.header__logoContainerLink}
          aria-label="Navigate to home page"
        >
          <ContentfulImage
            src={headerImage.url}
            height={96}
            width={96}
            alt={headerImage.description}
          />
        </Link>
      </div>
      <nav className={HeaderStyles.header__nav} role="navigation">
        <ul className={HeaderStyles.header__navList}>
          {Config.menuLinks.map((link) => {
            const onProject =
              router.pathname === Config.pageMeta.project.slug &&
              link.path === Config.pageMeta.projectIndex.slug;

            const onProjectIndexPage =
              router.pathname === Config.pageMeta.projectIndexPage.slug &&
              link.path === Config.pageMeta.projectIndex.slug;

            const isActive =
              onProject || onProjectIndexPage || router.pathname === link.path;
            const isActiveClass = isActive
              ? ` ${HeaderStyles.header__navListItem__active}`
              : "";

            return (
              <li
                key={link.displayName}
                className={HeaderStyles.header__navListItem + isActiveClass}
              >
                <Link
                  href={link.path}
                  className={HeaderStyles.header__navListItemLink}
                >
                  {link.displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SocialLinks />
    </header>
  );
}
