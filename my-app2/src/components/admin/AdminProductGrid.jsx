import { PencilIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AdminProductGrid({ products, handleDelete }) {
  return (
    <div className="lg:col-span-3 ">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <Link
          to="/admin/product-form"
          className=" mt-2 items-center justify-center rounded-md bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Add Product
        </Link>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products?.length > 0 &&
            products.map((product) => (
              <div key={product.id} className=" relative grid grid-rows-1 ">
                <span className="absolute inset-0 z-10 opacity-0 hover:opacity-100">
                  <Link
                    to={`/admin/edit-product-form/${product.id}?path=homePage`}
                  >
                    <PencilIcon className="absolute top-4 right-16 inline p-2 z-20 items-center rounded-md h-10  text-sm font-medium text-white bg-opacity-50 bg-black border border-white  hover:bg-opacity-60"></PencilIcon>
                  </Link>
                  <XMarkIcon
                    onClick={() => handleDelete(product)}
                    className="absolute top-4 right-4 inline p-2 z-20 rounded-md h-10 text-sm font-medium  text-white bg-opacity-50 bg-black border border-white cursor-pointer hover:bg-opacity-60"
                  />
                  <Link
                    to={`/admin/product-detail/${product.id}`}
                    className="absolute inset-0"
                  ></Link>
                </span>
                <div className="flex flex-col justify-between group rounded-md p-2  border-2 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:border-transparent ">
                  <div>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 dark:opacity-90 dark:group-hover:opacity-100  lg:h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-medium text-black-700 dark:text-gray-200">
                          {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                          {product.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center ">
                          <StarIcon className="h-4 w-4"></StarIcon>
                          {product.rating}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          ₹
                          {(
                            product.price -
                            product.price * (product.discountPercentage / 100)
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm font-medium line-through text-gray-400 dark:text-gray-500">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {product.deleted && (
                      <p className="text-red-500">product is deleted</p>
                    )}
                    {product.stock === 0 && (
                      <p className="text-red-500">out of stock</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
