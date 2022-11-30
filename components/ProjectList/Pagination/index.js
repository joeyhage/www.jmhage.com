import PaginationStyles from "@styles/Pagination.module.css";
import Link from "next/link";
import ChevronLeft from "./svg/ChevronLeft";
import ChevronRight from "./svg/ChevronRight";

export default function Pagination({
  totalPages,
  currentPage,
  prevDisabled,
  nextDisabled,
}) {
  const prevPageUrl =
    currentPage === "2"
      ? "/projects"
      : `/projects/page/${parseInt(currentPage, 10) - 1}`;
  const nextPageUrl = `/projects/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <div className={PaginationStyles.pagination}>
      <ol className={PaginationStyles.pagination__list}>
        <li className={PaginationStyles.pagination__listItem}>
          {prevDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span
                className={PaginationStyles.pagination__chevronContainer__left}
              >
                <ChevronLeft />
              </span>
              <span>Prev</span>
            </span>
          )}
          {!prevDisabled && (
            <Link href={prevPageUrl}>
              <span
                className={PaginationStyles.pagination__chevronContainer__left}
              >
                <ChevronLeft />
              </span>
              <span>Prev</span>
            </Link>
          )}
        </li>
        <li
          className={`${PaginationStyles.pagination__listItem} ${PaginationStyles.pagination__listItem__pageDescriptor}`}
        >
          Page {currentPage} of {totalPages}
        </li>
        <li className={PaginationStyles.pagination__listItem}>
          {nextDisabled && (
            <span className={PaginationStyles.pagination__listItem__disabled}>
              <span>Next</span>
              <span
                className={PaginationStyles.pagination__chevronContainer__right}
              >
                <ChevronRight />
              </span>
            </span>
          )}
          {!nextDisabled && (
            <Link href={nextPageUrl}>
              <span>Next</span>
              <span
                className={PaginationStyles.pagination__chevronContainer__right}
              >
                <ChevronRight />
              </span>
            </Link>
          )}
        </li>
      </ol>
    </div>
  );
}
