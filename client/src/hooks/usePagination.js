import { useState, useEffect } from "react";

export const usePagination = (totalItems, sort) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return { page, setPage };
};
