import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetNewProduct,
  selectProductById,
} from "../redux";

export default function useProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(resetNewProduct());
  }, [dispatch]);

  return product
}
