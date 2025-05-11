import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AdminProductGrid,
  DesktopFilter,
  MobileFilterButton,
  MobileFilterDialog,
  Pagination,
  Sort,
} from "../../components";
import useAdminProductListHandler from "../../hooks/Admin/useAdminProductListHandler";
import {
  selectAllProducts
} from "../../redux";

function AdminProductListPage() {
  const products = useSelector(selectAllProducts);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState({});
  const [filterFlag, setFilterFlag] = useState(false);
  const { handleDelete, handleFilter, filter, page, setPage, totalItems } =
    useAdminProductListHandler({
      sort,
      setFilterFlag,
    });

  return (
    <div className="ProductList">
      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
        <div>
          <MobileFilterDialog
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
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
                <DesktopFilter handleFilter={handleFilter} filter={filter} />

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
