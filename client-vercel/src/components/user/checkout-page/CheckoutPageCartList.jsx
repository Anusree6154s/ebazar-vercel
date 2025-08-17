import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectLoggedInUser,
  updateCartAsync,
} from "../../../redux";
import { getDiscountedPrice } from "../../../util/discounted-price";
import CustomSelect from "../../common/CustomSelect";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPageCartList({ item, quantity, itemId }) {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const handleQuantity = (value) => {
    dispatch(
      updateCartAsync({
        id: itemId,
        product: item.id,
        quantity: +value,
        user: user.id,
      })
    );
  };
  const handleDelete = (item) => dispatch(deleteItemFromCartAsync(item.id));

  return (
    <li key={item.id} className="flex py-6 items=stretch">
      <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover object-center cursor-pointer"
          onClick={() => navigate(`/product-detail/${item.id}`)}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col gap-4 sm:gap-0 lg:gap-4 ">
        <div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-0 lg:gap-4 justify-between text-base font-medium text-gray-900 dark:text-gray-300">
            <h3 className="flex flex-col">
              <Link to={`/product-detail/${item.id}`}>{item.title}</Link>
              <span className="text-gray-400 uppercase text-xs font-bold">
                {item.brand || "No Brand"}
              </span>
            </h3>
            <p className="flex gap-4 sm:gap-0 lg:gap-4 sm:flex-col lg:flex-row sm:text-right lg:text-left whitespace-nowrap items-center">
              <span>
                ₹
                {getDiscountedPrice(
                  item.price,
                  item.discountPercentage,
                  quantity
                )}
              </span>
              <span className="text-sm text-gray-400/80 line-through">
                ₹ {(item.price * quantity).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between  text-sm ">
          <div className="text-gray-500 dark:text-gray-300 inline-block">
            <label className="mr-3 ">Qty</label>
            <CustomSelect
              options={[1, 2, 3, 4]}
              onClickFn={handleQuantity}
              startingValue={quantity}
            />
          </div>

          <div className="flex">
            <button
              onClick={() => handleDelete(item)}
              type="button"
              className="font-medium text-customBlue opacity-80 hover:opacity-100"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
