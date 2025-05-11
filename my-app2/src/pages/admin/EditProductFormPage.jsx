import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { BackButton } from "../../components";
import EditProductForm from "../../components/admin/EditProductForm";
import { selectNewProduct } from "../../redux";
import { FormProvider, useForm } from "react-hook-form";

function EditProductFormPage() {
  const newProduct = useSelector(selectNewProduct);

  const searchParams = new URLSearchParams(useLocation().search);
  const param = searchParams.get("path");
  const methods = useForm();

  if (newProduct) {
    if (param === "homePage") return <Navigate to={`/admin`} />;
    else if (param === "productPage")
      return <Navigate to={`/admin/product-detail/${newProduct.id}`} />;
  }

  return (
    <>
      <BackButton />

      <div className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900  max-w-2xl py-10 px-12 lg:max-w-7xl">
        <FormProvider {...methods}>
          <EditProductForm />
        </FormProvider>
      </div>
    </>
  );
}

export default EditProductFormPage;
