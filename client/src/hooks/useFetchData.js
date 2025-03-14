import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
  selectLoggedInUser,
  selectTotalItems,
} from "../redux";

export const useFetchData = (filter, sort, page) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brandsUnsorted = useSelector(selectAllBrands);
  const categoriesUnsorted = useSelector(selectAllCategories);

  const brands = [...brandsUnsorted].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const categories = [...categoriesUnsorted].sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    const pagination = { _page: page };
    dispatch(
      fetchProductsByFiltersAsync({
        role: user ? user.role : "user",
        filter,
        sort,
        pagination,
      })
    );
  }, [user, filter, sort, page, dispatch]);

  return { products, totalItems, brands, categories, user };
};
