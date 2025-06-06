import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishlistIDB,
  getWishlistItemsIDB
} from "../indexedDB/wishlistDB";
import {
  addToWishListAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductCountAsync,
  fetchProductsByFiltersAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
  selectLoggedInUser,
  selectTotalItems
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
    dispatch(fetchProductCountAsync());
  }, [dispatch]);
  // console.log("user in useFetchData", user);

  useEffect(() => {
    if (user?.role === "user") {
      const fetchWishlistItemsIDB = async () => {
        try {
          const wishlistItemsIDB = await getWishlistItemsIDB();
          return wishlistItemsIDB;
        } catch (error) {
          console.error("Error fetching IDB wishlist length: ", error);
        }
      };

      const StoreIDBWishlistToDB = async () => {
        const wishlistItemsIDB = await fetchWishlistItemsIDB();
        if (wishlistItemsIDB.length > 0) {
          wishlistItemsIDB.forEach((item) =>
            dispatch(addToWishListAsync(item))
          );
          await clearWishlistIDB();
        }
      };

      StoreIDBWishlistToDB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
