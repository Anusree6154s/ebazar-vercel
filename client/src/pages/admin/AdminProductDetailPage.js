import React from "react";
import { useSelector } from "react-redux";
import {
  BackButton,
  BreadCrumb,
  Loader,
  ProductImages,
  ProductInfoDesktop,
  ProductInfoMobile,
} from "../../components";
import AdminProductDetailUpdateButtons from "../../components/admin/AdminProductDetailUpdateButtons";
import useAdminProductDetailHandler from "../../hooks/Admin/useAdminProductDetailHandler";
import {
  selectProductById
} from "../../redux";

function AdminProductDetailPage() {
  const product = useSelector(selectProductById);
  const { handleDelete } = useAdminProductDetailHandler({ product });

  if (!product) return <Loader />;

  return (
    <section id="product-detail">
      <div className="flex items-center justify-between mb-2 ">
        <BackButton />
        <AdminProductDetailUpdateButtons
          product={product}
          handleDelete={handleDelete}
        />
      </div>

      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 rounded-md">
        <div className="px-10 py-6 flex flex-col gap-6 ">
          <BreadCrumb productTitle={product.title} link="/" />

          <div className="flex flex-col gap-6 flex-wrap md:flex-row">
            <ProductImages productImages={product.images} />

            <ProductInfoDesktop product={product} />

            <ProductInfoMobile product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminProductDetailPage;
