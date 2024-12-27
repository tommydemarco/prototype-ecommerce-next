import React from "react";
import styles from "./FilterItems.module.css";
import { useRouter } from "next/router";
import { Link } from "../Link/Link";

type FilterItem = {
  name: string;
  routerPath: string;
  asSearchParam: boolean;
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

  console.log("===", filterItems);

  return (
    <div className={styles.container}>
      <div className={styles.filterTitle}>{filterTitle}</div>
      <ul className={styles.desktopList}>
        {filterItems.map((filterItem) => (
          <li key={filterItem.routerPath}>
            <Link href={`/search/${filterItem.routerPath}`}>
              {filterItem.name}
            </Link>
          </li>
        ))}
      </ul>

      <select
        className={styles.mobileSelect}
        onChange={(e) => router.push(`/search/${e.target.value}`)}
        title={filterTitle}
      >
        {filterItems.map((filterItem) => (
          <option key={filterItem.routerPath} value={filterItem.routerPath}>
            {filterItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};
