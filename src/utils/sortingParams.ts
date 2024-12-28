export const sortingParams = [
  {
    name: "Default",
    query: { sort: undefined },
  },
  {
    name: "Price: low to high",
    query: { sort: "price-asc" },
    asSearchParam: true,
  },
  {
    name: "Price: high to low",
    query: { sort: "price-desc" },
  },
];
