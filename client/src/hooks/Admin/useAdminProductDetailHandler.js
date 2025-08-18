import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProductAsync,
  fetchProductByIdAsync,
  resetNewProduct
} from "../../redux";

export default function useAdminProductDetailHandler({product}) {
  const dispatch = useDispatch();

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
  return { handleDelete };
}
