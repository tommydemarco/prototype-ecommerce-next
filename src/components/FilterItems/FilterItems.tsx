import React from "react";
import styles from "./FilterItems.module.css";
import { useRouter } from "next/router";
import { NavigationLink } from "../NavigationLink/NavigationLink";
import { usePathname, useSearchParams } from "next/navigation";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

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

export const FilterItems: React.FC<FilterItemsProps> = ({
  isLoading,
  filterTitle,
  filterItems,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());

  const buildHref = (basePath: string | null, filterItem: FilterItem) => {
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
            ([key]) => key !== "max-price" && key !== "q"
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
          !currentParams["max-price"] &&
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
          ? [1, 2, 3, 4].map((number) => (
              <SkeletonLoader height={18} key={number} />
            ))
          : filterItems.map((item) => (
              <li
                key={item.name}
                className={
                  activeItem?.name === item.name ? styles.activeItem : ""
                }
              >
                <NavigationLink href={buildHref(pathname, item)}>
                  {item.name}
                </NavigationLink>
              </li>
            ))}
      </ul>
      <select
        className={styles.mobileSelect}
        onChange={handleSelectChange}
        title={filterTitle}
        disabled={isLoading}
        value={isLoading ? "loading" : activeItem?.name || "select-category"}
      >
        {isLoading ? (
          <option disabled value="loading">
            Categories are loading...
          </option>
        ) : (
          <>
            <option value="select-category" disabled>
              Select a category
            </option>
            {filterItems.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};
