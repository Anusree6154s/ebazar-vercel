import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminProductGrid,
  DesktopFilter,
  MobileFilterButton,
  MobileFilterDialog,
  Pagination,
  Sort,
} from "../../components";
import {
  editProductAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  resetNewProduct,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
  selectLoggedInUser,
  selectTotalItems,
} from "../../redux";

function AdminProductListPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [filterFlag, setFilterFlag] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const user = useSelector(selectLoggedInUser);

  const filters = [
    {
      key: 0,
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      key: 1,
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

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

  return (
    <div className="ProductList">
      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
        <div>
          <MobileFilterDialog
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
            handleFilter={handleFilter}
            filter={filter}
          />

          <main className=" max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-end  p-6 ">
              <div className="flex items-center">
                <Sort setSort={setSort} />
                <MobileFilterButton
                  setMobileFiltersOpen={setMobileFiltersOpen}
                />
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter
                  filters={filters}
                  handleFilter={handleFilter}
                  filter={filter}
                />

                <AdminProductGrid
                  products={products}
                  handleDelete={handleDelete}
                />
              </div>
            </section>

            {filterFlag && (
              <Pagination
                handlePage={setPage}
                page={page}
                totalItems={totalItems}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminProductListPage;
