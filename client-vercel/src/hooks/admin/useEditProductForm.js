import { useDispatch, useSelector } from "react-redux";
import {
  editProductAsync,
  fetchProductByIdAsync,
  selectProductById,
} from "../../redux";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editFormFields } from "../../config/edit-form-sections.config";

export default function useEditProductForm() {
  const countArray = [1, 2, 3, 4];
  const selectedProduct = useSelector(selectProductById);

  const dispatch = useDispatch();
  const { setValue } = useFormContext();
  const params = useParams();

  useEffect(() => {
    if (selectedProduct) {
      editFormFields.forEach((field) => {
        setValue(field, selectedProduct[field]);
      });

      selectedProduct.images?.forEach((img, index) => {
        setValue(`image-${index + 1}`, img);
      });

      selectedProduct.highlights?.forEach((highlight, index) => {
        setValue(`highlight-${index + 1}`, highlight);
      });
    }
  }, [selectedProduct, setValue]);

  useEffect(() => {
    params.id && dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(editProductAsync(product));
  };

  const submitHandler = (data) => {
    const product = {
      ...data,
      id: selectedProduct.id,
      rating: selectedProduct.rating,
      images: selectedProduct.images?.forEach(
        (_, index) => data[`image-${index + 1}`]
      ),
      highlights: selectedProduct.highlights?.forEach(
        (_, index) => data[`highlight-${index + 1}`]
      ),
    };

    for (let number of countArray) {
      delete product[`highlight-${number}`];
      delete product[`image-${number}`];
    }
    dispatch(editProductAsync(product));
  };
  return { submitHandler, handleDelete };
}
