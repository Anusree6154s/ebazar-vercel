import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon, StarIcon as StarIconOutline } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/solid";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductByIdAsync,
  fetchProductsByFiltersAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
  selectLoggedInUser,
  selectTotalItems,
} from "../../redux";
import { ITEMS_PER_PAGE } from "../../app/constants";
import ImageTransformer from "./ImageTransformer";
// import { ChevronDownIcon } from "@heroicons/react/solid";

//TODO: on server, code for sortaoptions
//TODO: in own project, fix json server link to show data for multiple filter options , and pagination for multiple limits

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [filterFlag, setFilterFlag] = useState(false);
  const [sortOptions, setSortOptions] = useState([
    { name: "Best Rating", sorts: "rating", order: "desc", current: false },
    {
      name: "Price: Low to High",
      sorts: "price",
      order: "asc",
      current: false,
    },
    {
      name: "Price: High to Low",
      sorts: "price",
      order: "desc",
      current: false,
    },
    { name: "Clear Sort", current: false },
  ]);

  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brandsUnsorted = useSelector(selectAllBrands);
  const brands = [...brandsUnsorted].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const categoriesUnsorted = useSelector(selectAllCategories);
  const categories = [...categoriesUnsorted].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
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
    //TODO: on server it will support multiple categories
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

  const handleSort = (option) => {
    const newSort =
      option.name === "Clear Sort"
        ? {}
        : { _sort: option.sorts, _order: option.order };
    setSort(newSort);

    const newSortOptions = sortOptions.map((item) => {
      if (item.name === option.name && item.name !== "Clear Sort")
        return { ...item, current: true };
      return { ...item, current: false };
    });
    setSortOptions(newSortOptions);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page };
    if (user) {
      dispatch(
        fetchProductsByFiltersAsync({
          role: user.role,
          filter,
          sort,
          pagination,
        })
      );
    } else {
      dispatch(
        fetchProductsByFiltersAsync({
          role: "user",
          filter,
          sort,
          pagination,
        })
      );
    }
  }, [user, filter, sort, page, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("products:", products);
  //   if (products && products.length > 0) {
  //     products.forEach((product) => {
  //       dispatch(fetchProductByIdAsync(product.id));
  //     });
  //   }
  // }, [products]);

  return (
    <div className="ProductList">
      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md ">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
            handleFilter={handleFilter}
            filter={filter}
          ></MobileFilter>

          <main className=" max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Options Tab */}
            <div className="flex items-baseline justify-end px-6 pt-6">
              <div className="flex items-center">
                {/* Sort Menu*/}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-2xl ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name} label={option.label}>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900 dark:text-gray-100"
                                    : "text-gray-500 dark:text-gray-300",
                                  active &&
                                    "bg-gray-100 dark:bg-gray-600 w-full",
                                  "block px-4 py-2 text-sm cursor-pointer w-full text-left"
                                )}
                                onClick={(e) => handleSort(option)}
                              >
                                {option.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Filter Button */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  filters={filters}
                  handleFilter={handleFilter}
                  filter={filter}
                ></DesktopFilter>

                {/* Product grid */}
                {products ? (
                  products.length > 0 ? (
                    <ProductGrid products={products}></ProductGrid>
                  ) : (
                    <p className="text-gray-500 text-center col-span-3">
                      No Products Available
                    </p>
                  )
                ) : (
                  <div className="col-span-1 lg:col-span-3">
                    <div className="loader-wrapper">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Pagination */}
            {!filterFlag && (
              <Pagination
                handlePage={handlePage}
                page={page}
                setPage={setPage}
                totalItems={totalItems}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  filter,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 dark:hover:text-gray-100"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200 dark:border-gray-700">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 dark:border-gray-600 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-gray-800 px-2 py-3 text-gray-400 hover:text-gray-500  dark:hover:text-gray-100">
                            <span className="font-medium text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={
                                    filter[section.id]
                                      ? filter[section.id].includes(
                                          option.value
                                        )
                                      : false
                                  }
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className={`h-4 w-4 rounded border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 focus:ring-transparent text-customBlue `}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-gray-300"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ filters, handleFilter, filter }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 dark:border-gray-500 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-gray-800 py-3 text-sm text-gray-400 hover:text-gray-500 datk:text-gray-300 dark:hover:text-gray-100">
                  <span className="font-medium text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIndex) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIndex}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={
                          filter[section.id]
                            ? filter[section.id].includes(option.value)
                            : false
                        }
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-customBlue focus:ring-transparent"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIndex}`}
                        className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({ products }) {
  return (
    <section className="lg:col-span-3" id="product-grid">
      {/* Your content */}
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border-[1.5px] dark:border-gray-700  rounded-md p-2 flex flex-col justify-between dark:hover:bg-gradient-to-b dark:hover:from-gray-900 dark:hover:to-transparent transition duration-300 "
              id="product-grid-card"
            >
              <div className="aspect-[1/1] w-full min-h-auto overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 dark:opacity-95  dark:group-hover:opacity-100  lg:h-60  bg-gray-50 flex-1 transition-opacity duration-300">
                <ImageTransformer src={product.thumbnail} className={""}/>
              </div>
              <div className="mt-4 flex-1">
                <Link to={`/product-detail/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                </Link>
                <div className="flex flex-col gap-2 justify-between h-full">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      {product.brand || "No Brand"}
                    </span>
                    <h3 className="text-sm text-gray-700 dark:text-gray-200 truncate">
                      {product.title}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <p className=" font-medium text-3xl md:text-2xl text-gray-900 dark:text-gray-100">
                      <span className="mr-1">₹</span>
                      {(
                        product.price -
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                    <div className="flex gap-2 text-sm">
                      <p className="font-medium line-through text-gray-400 dark:text-gray-500 ">
                        ${product.price}
                      </p>
                      <p className=" text-green-600 dark:text-green-600 font-medium  ">
                        {product.discountPercentage}% off
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex gap-[0.18rem] items-center ">
                      {[0, 1, 2, 3, 4].map((index) => {
                        const isFullStar = product.rating >= index + 1; // Fully filled star

                        return (
                          <span key={index}>
                            {isFullStar ? (
                              <StarIconSolid className="text-yellow-400 h-4 w-4" />
                            ) : (
                              <StarIconOutline className="text-gray-300 dark:text-yellow-700 h-4 w-4" />
                            )}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="flex justify-center gap-5 z-10 cursor-pointer">
                    <ShoppingCartIcon className="h-8 w-8 rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" />
                    <HeartIcon className="h-8 w-8  rounded-full p-2 hover:bg-gray-100 text-gray-700  transition duration-300 border dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" />
                  </div>
                </div>
              </div>
              <p className="text-red-500 text-[0.65rem] font-bold text-center mt-2">
                {product.stock === 0 && "Out of stock"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pagination({ handlePage, page, totalItems }) {
  const [pageBoundary, setPageBoundary] = useState({
    start: 1,
    end: 10,
    index: 0,
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startItems = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItems =
    page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE;

  const handlePrev = () => {
    handlePage(page > 1 ? page - 1 : page);
    if (page === pageBoundary.start && page !== 1)
      setPageBoundary({
        start: pageBoundary.start - 1,
        end: pageBoundary.end - 1,
        index: pageBoundary.index - 1,
      });
  };

  const handleNext = () => {
    handlePage(page < totalPages ? page + 1 : page);
    if (page === pageBoundary.end && page !== totalPages)
      setPageBoundary({
        start: pageBoundary.start + 1,
        end: pageBoundary.end + 1,
        index: pageBoundary.index + 1,
      });
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:border-transparent dark:bg-gray-800 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
            page - 1 < 1
              ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
              : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
          }`}
        >
          Previous
        </button>
        <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Page {page}
        </p>
        <button
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className={`relative inline-flex items-center rounded-md border border-gray-300   px-4 py-2 text-sm font-medium ${
            page + 1 > totalPages
              ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
              : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startItems}</span> to{" "}
            <span className="font-medium">{endItems}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={handlePrev}
              className={`relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium ${
                page - 1 < 1
                  ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
                  : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>

            {Array.from({ length: 10 }).map((items, index) => (
              <div
                key={index}
                onClick={() => handlePage(index + 1 + pageBoundary.index)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center dark:border-gray-500 ${
                  index + 1 + pageBoundary.index === page
                    ? "bg-customBlue dark:bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-100 "
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue cursor-pointer ring-gray-300 dark:ring-gray-700  border border-gray-300 `}
              >
                {index + 1 + pageBoundary.index}
              </div>
            ))}

            <div
              onClick={handleNext}
              className={`relative inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium ${
                page + 1 > totalPages
                  ? "bg-gray-100 text-gray-300 dark:bg-gray-800 dark:text-gray-700 cursor-auto dark:border-gray-700 "
                  : "text-gray-700 dark:text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:border-gray-500 "
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
