import ExternalUrlStyles from "@styles/ExternalUrl.module.css";
import Link from "next/link";

export default function ExternalUrl({ children, url }) {
  function formatUrlForDisplay(url) {
    return new URL(url).hostname;
  }

  return (
    <div>
      <h2 className="title is-4">{children}</h2>
      <p className={ExternalUrlStyles.externalUrl__text}>
        <Link href={url}>
          <a
            target="_blank"
            rel="nofollow noreferrer"
            className={ExternalUrlStyles.externalUrl__link}
          >
            {formatUrlForDisplay(url)}
          </a>
        </Link>
      </p>
    </div>
  );
}
