import React, { useState } from "react";
import {
  BackButton,
  BreadCrumb,
  ProductImages,
  ProductInfoDesktop,
  ProductInfoMobile,
} from "../../components";
import {
  useHandleAdd,
  useHandleBuy,
  useHandleWishlist,
  useProductDetail,
} from "../../hooks";

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const product = useProductDetail();

  const { handleWishList } = useHandleWishlist({ product });
  const { handleAdd } = useHandleAdd({ quantity, product });
  const { handleBuy } = useHandleBuy({ quantity, product });

  return (
    <div>
      <BackButton />

      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
        {product && (
          <div className="px-10 py-6 flex flex-col gap-6 ">
            <BreadCrumb productTitle={product.title} link="/" />

            <div className="flex flex-col gap-6 flex-wrap md:flex-row">
              <ProductImages productImages={product.images} />

              <ProductInfoDesktop
                product={product}
                handleQuantity={(e) => setQuantity(+e.target.value)}
                handleWishList={handleWishList}
                handleAdd={handleAdd}
                handleBuy={handleBuy}
              />

              <ProductInfoMobile
                product={product}
                handleQuantity={(e) => setQuantity(+e.target.value)}
                handleWishList={handleWishList}
                handleAdd={handleAdd}
                handleBuy={handleBuy}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
