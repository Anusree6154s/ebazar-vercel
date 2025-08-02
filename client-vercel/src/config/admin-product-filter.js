import { useSelector } from "react-redux";
import { selectAllBrands, selectAllCategories } from "../redux";

export const AdminProductFilers = () => {
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  return [
    {
      key: 0,
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      key: 1,
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];
};
