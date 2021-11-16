import ExternalUrlStyles from "@styles/ExternalUrl.module.css";
import Link from "next/link";

export default function ExternalUrl({ url }) {
  function formatUrlForDisplay(url) {
    return new URL(url).hostname;
  }

  return (
    <div>
      <h2 className="title is-4">Project link</h2>
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
