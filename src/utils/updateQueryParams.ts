import { NextRouter } from "next/router";

export const updateQueryParam = (
  router: NextRouter,
  queryParam: { key: string; value: string } | null
) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  if (queryParam !== null) {
    params.set(queryParam.key, queryParam.value);
    router.push(`${url.pathname}?${params.toString()}`);
  } else {
    router.push(url.pathname);
  }
};
