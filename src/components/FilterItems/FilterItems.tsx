import React from "react";
import styles from "./FilterItems.module.css";
import { useRouter } from "next/router";
import { Link } from "../Link/Link";
import { usePathname, useSearchParams } from "next/navigation";

type FilterItem = {
  name: string;
  path?: string;
  query?: { [key: string]: string | undefined };
};

type FilterItemsProps = {
  filterTitle: string;
  filterItems: FilterItem[];
};

export const FilterItems: React.FC<FilterItemsProps> = ({
  filterTitle,
  filterItems,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearchParams = Object.fromEntries(searchParams.entries());

  const activeItem = filterItems.find((filterItem) => {
    const pathnameFilter = pathname?.split("/")[2];
    if (filterItem.path !== undefined) {
      return (
        filterItem.path === pathnameFilter ||
        (filterItem.path === "" &&
          pathnameFilter === undefined &&
          currentSearchParams["price-limit"] === undefined)
      );
    } else if (filterItem.query !== undefined) {
      let isMatch = false;
      Object.entries(filterItem.query).forEach(([key]) => {
        if (currentSearchParams[key] === filterItem.query?.[key])
          isMatch = true;
      });
      return isMatch;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.filterTitle}>{filterTitle}</div>
      <ul className={styles.desktopList}>
        {filterItems.map((filterItem) => (
          <li
            key={filterItem.name}
            className={
              activeItem?.name === filterItem.name
                ? styles.activeItem
                : undefined
            }
          >
            <Link
              href={{
                pathname:
                  filterItem.path !== undefined
                    ? filterItem.path
                      ? `/search/${filterItem.path}`
                      : "/search"
                    : pathname,
                query: filterItem.query
                  ? Object.fromEntries(
                      Object.entries({
                        ...currentSearchParams,
                        ...filterItem.query,
                      }).filter(([_, value]) => value !== undefined)
                    )
                  : Object.fromEntries(
                      Object.entries({
                        ...currentSearchParams,
                      }).filter(([key]) => key !== "price-limit")
                    ),
              }}
            >
              {filterItem.name}
            </Link>
          </li>
        ))}
      </ul>

      <select
        className={styles.mobileSelect}
        onChange={(e) => {
          const selectedFilterItem = filterItems.find(
            (filterItem) => filterItem.name === e.target.value
          );
          if (!selectedFilterItem) return;
          router.push({
            pathname:
              selectedFilterItem.path !== undefined
                ? selectedFilterItem.path
                  ? `/search/${selectedFilterItem.path}`
                  : "/search"
                : pathname,
            query: selectedFilterItem.query
              ? Object.fromEntries(
                  Object.entries({
                    ...currentSearchParams,
                    ...selectedFilterItem.query,
                  }).filter(([_, value]) => value !== undefined)
                )
              : Object.fromEntries(
                  Object.entries({
                    ...currentSearchParams,
                  }).filter(([key]) => key !== "price-limit")
                ),
          });
        }}
        title={filterTitle}
      >
        {filterItems.map((filterItem) => (
          <option key={filterItem.name} value={filterItem.name}>
            {filterItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};
