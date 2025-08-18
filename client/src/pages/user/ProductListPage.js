import { useState } from "react";
import { useSelector } from "react-redux";
import {
  DesktopFilter,
  MobileFilterButton,
  MobileFilterDialog,
  Pagination,
  ProductGrid,
  Sort,
} from "../../components";
import { useFetchData, useFilters } from "../../hooks";
import { selectPage } from "../../redux";

function ProductListPage() {
  const [sort, setSort] = useState({});
  const { filter, filterFlag, handleFilter } = useFilters();
  const page = useSelector(selectPage);
  const { products, totalItems, brands, categories } = useFetchData(
    filter,
    sort,
    page
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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

  return (
    <div className="ProductList">
      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md ">
        <div>
          <MobileFilterDialog
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
            handleFilter={handleFilter}
            filter={filter}
          />

          <main className=" max-w-7xl p-4 sm:p-6 lg:p-8">
            <div className="flex items-baseline justify-end " id="options-tab">
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

                <ProductGrid products={products} />
              </div>
            </section>
            

            {!filterFlag && <Pagination totalItems={totalItems} />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
