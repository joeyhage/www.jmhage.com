import PublishedDateStyles from "@styles/PublishedDate.module.css";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay
} from "@utils/Date";

export default function PublishedDate({ date }) {
  return (
    <time
      className={PublishedDateStyles.publishedDate}
      dateTime={formatPublishedDateForDateTime(date)}
    >
      {formatPublishedDateForDisplay(date)}
    </time>
  );
}
