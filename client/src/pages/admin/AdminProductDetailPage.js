import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackButton,
  BreadCrumb,
  Loader,
  ProductImages,
  ProductInfoDesktop,
  ProductInfoMobile,
} from "../../components";
import {
  editProductAsync,
  fetchProductByIdAsync,
  resetNewProduct,
  selectProductById,
} from "../../redux";

function AdminProductDetailPage() {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(resetNewProduct());
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    const oldProduct = { ...product };
    oldProduct.deleted = true;
    await dispatch(editProductAsync(oldProduct));
    navigate("/admin");
  }, [dispatch, navigate, product]);

  if (!product) return <Loader />;

  return (
    <section id="product-detail">
      <div className="flex items-center justify-between mb-2 ">
        <BackButton />
        <div>
          <button
            className="p-2 block items-center rounded-md h-10 bg-customBlue dark:bg-blue-500 text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-blue-600 focus:ring-offset-2"
            onClick={() =>
              navigate(
                `/admin/edit-product-form/${product.id}?path=productPage`
              )
            }
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="p-2 ml-2 rounded-md h-10 bg-red-500 dark:bg-red-800  text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-red-800 focus:ring-offset-2 "
          >
            Delete
          </button>
        </div>
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
