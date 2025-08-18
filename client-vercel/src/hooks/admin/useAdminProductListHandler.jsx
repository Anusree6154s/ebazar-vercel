import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editProductAsync,
    fetchBrandsAsync,
    fetchCategoriesAsync,
    fetchProductsByFiltersAsync,
    resetNewProduct,
    selectLoggedInUser,
    selectTotalItems,
} from "../../redux";

export default function useAdminProductListHandler({ sort, setFilterFlag }) {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const totalItems = useSelector(selectTotalItems);
  const user = useSelector(selectLoggedInUser);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      let index = newFilter[section.id].findIndex(
        (item) => item === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
    if (
      (newFilter["brand"] && newFilter.brand.length !== 0) ||
      (newFilter["category"] && newFilter.category.length !== 0)
    )
      setFilterFlag(true);
    else setFilterFlag(false);
  };

  useEffect(() => {
    const pagination = { _page: page };
    user &&
      dispatch(
        fetchProductsByFiltersAsync({
          role: user.role,
          filter,
          sort,
          pagination,
        })
      );
  }, [user, filter, sort, page, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
    dispatch(resetNewProduct());
  }, [dispatch]);

  const handleDelete = useCallback(
    (products) => {
      const product = { ...products };
      product.deleted = true;
      dispatch(editProductAsync(product));
    },
    [dispatch]
  );

  return { handleFilter, handleDelete, filter, page, setPage, totalItems };
}
