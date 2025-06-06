import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BackButton } from "../../components";
import AddProductForm from "../../components/admin/AddProductForm";
import {
  selectNewProduct
} from "../../redux";

function AddProductFormPage() {
  const newProduct = useSelector(selectNewProduct);

  if (newProduct)
    return <Navigate to={`/admin/product-detail/${newProduct.id}`} />;

  return (
    <section id="add-product">
      <BackButton />

      <div className="bg-white dark:bg-gradient-to-b 
      dark:from-gray-800 dark:to-gray-900 mx-auto max-w-2xl py-10 px-12 lg:max-w-7xl">
        <AddProductForm />
      </div>
    </section>
  );
}

export default AddProductFormPage;
