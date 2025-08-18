import { useDispatch } from "react-redux";
import { createProductAsync } from "../../redux";

export default function useAddProductForm() {
  const countArray = [1, 2, 3, 4];

  const dispatch = useDispatch();
  const submitHandler = (data) => {
    const product = {
      ...data,
      rating: 0,
      images: countArray.map((number) => data[`image-${number}`]),
      highlights: countArray.map((number) => data[`highlight-${number}`]),
    };

    for (let number of countArray) {
      delete product[`highlight-${number}`];
      delete product[`image-${number}`];
    }
    dispatch(createProductAsync(product));
  };
  return { submitHandler };
}
