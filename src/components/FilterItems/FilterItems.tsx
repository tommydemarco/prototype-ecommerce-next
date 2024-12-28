import React from "react";
import styles from "./FilterItems.module.css";
import { useRouter } from "next/router";
import { Link } from "../Link/Link";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "../Skeleton/Skeleton";

type FilterItem = {
  name: string;
  path?: string;
  query?: { [key: string]: string | undefined };
};

type FilterItemsProps = {
  filterTitle: string;
  filterItems: FilterItem[];
  isLoading?: boolean;
};

const buildHref = (
  basePath: string | null,
  currentParams: Record<string, string>,
  filterItem: FilterItem
) => {
  const resolvedPathname =
    filterItem.path !== undefined
      ? filterItem.path
        ? `/search/${filterItem.path}`
        : "/search"
      : basePath;

  const query = filterItem.query
    ? Object.fromEntries(
        Object.entries({
          ...currentParams,
          ...filterItem.query,
        }).filter(([_, value]) => value !== undefined)
      )
    : Object.fromEntries(
        Object.entries(currentParams).filter(
          ([key]) => key !== "price-limit" && key !== "q"
        )
      );

  return { pathname: resolvedPathname, query };
};

const isActiveItem = (
  filterItem: FilterItem,
  pathname: string | null,
  currentParams: Record<string, string>
) => {
  const pathnameFilter = pathname?.split("/")[2];

  if (filterItem.path !== undefined) {
    return (
      filterItem.path === pathnameFilter ||
      (filterItem.path === "" &&
        pathnameFilter === undefined &&
        !currentParams["price-limit"] &&
        !currentParams["q"])
    );
  }

  if (filterItem.query) {
    return Object.entries(filterItem.query).every(
      ([key, value]) => currentParams[key] === value
    );
  }

  return false;
};

export const FilterItems: React.FC<FilterItemsProps> = ({
  isLoading,
  filterTitle,
  filterItems,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());

  const activeItem = filterItems.find((item) =>
    isActiveItem(item, pathname, currentParams)
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = filterItems.find(
      (item) => item.name === event.target.value
    );

    if (selectedItem) {
      const { pathname: resolvedPathname, query } = buildHref(
        pathname,
        currentParams,
        selectedItem
      );
      router.push({ pathname: resolvedPathname, query });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterTitle}>{filterTitle}</div>
      <ul className={styles.desktopList}>
        {isLoading
          ? [1, 2, 3, 4].map((number) => <Skeleton height={20} key={number} />)
          : filterItems.map((item) => (
              <li
                key={item.name}
                className={
                  activeItem?.name === item.name ? styles.activeItem : ""
                }
              >
                <Link href={buildHref(pathname, currentParams, item)}>
                  {item.name}
                </Link>
              </li>
            ))}
      </ul>
      <select
        className={styles.mobileSelect}
        onChange={handleSelectChange}
        title={filterTitle}
        disabled={isLoading}
      >
        {isLoading ? (
          <option selected disabled>
            Categories are loading...
          </option>
        ) : (
          filterItems.map((item) => (
            <option
              selected={activeItem?.name === item.name}
              key={item.name}
              value={item.name}
            >
              {item.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};
