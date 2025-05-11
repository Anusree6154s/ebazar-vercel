import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectAllOrders } from "../../redux";

export default function useOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ _sort: "id", _order: "asc" });

  useEffect(() => {
    const pagination = { _page: page };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return { sort, page, orders, setPage, setSort };
}
