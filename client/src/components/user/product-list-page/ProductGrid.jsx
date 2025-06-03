import React from "react";
import Loader from "../../common/Loader";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products)
    return (
      <div className="flex col-span-3 h-fit justify-center">
        <Loader fill="#21AAF3" />
      </div>
    );
  if (products.length === 0)
    return (
      <p className="text-gray-500 text-center col-span-3">
        No Products Available
      </p>
    );
  return (
    <section className="lg:col-span-3" id="product-grid">
      <div className="mx-auto max-w-2xl  py-0  sm:py-0 lg:max-w-7xl ">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
