export const sortingParams = [
  {
    name: "Default",
    routerPath: "",
    asSearchParam: true,
  },
  {
    name: "Price: low to high",
    routerPath: "sort=price-asc",
    asSearchParam: true,
  },
  {
    name: "Price: high to low",
    routerPath: "sort=price-desc",
    asSearchParam: true,
  },
  {
    name: "Cheapest",
    routerPath: "price_below=20",
    asSearchParam: true,
  },
];
