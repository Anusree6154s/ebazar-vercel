import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  deleteItemFromCartIDBAsync,
  selectLoggedInUser,
  updateCartAsync,
  updateCartIDBAsync,
} from "../../../redux";
import { getDiscountedPrice } from "../../../util/discounted-price";
import CustomSelect from "../../common/CustomSelect";

export default function CartItem({ item, quantity, itemId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);

  const handleClick = (value) => {
    if (user) {
      dispatch(
        updateCartAsync({
          id: itemId,
          product: item.id,
          quantity: +value,
          user: user.id,
        })
      );
    } else {
      dispatch(
        updateCartIDBAsync({
          ...item,
          product: item.id,
          quantity: +value,
        })
      );
    }
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover object-center cursor-pointer"
          onClick={() => navigate(`/product-detail/${item.id}`)}
        />
      </div>

      <div className="ml-4 flex flex-1 justify-between text-base font-medium text-gray-900 dark:text-gray-300">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h3>
              <Link to={`/product-detail/${item.id}`}>{item.title}</Link>
            </h3>
            <h5 className="text-gray-400 font-bold text-xs uppercase">
              <Link to={`/product-detail/${item.id}`}>
                {item.brand || "No Brand"}
              </Link>
            </h5>
          </div>
          <div className="text-gray-500 text-sm inline-block">
            <label className="mr-3 dark:text-gray-300">Qty</label>
            <CustomSelect options={[1, 2, 3, 4]} onClickFn={handleClick} />
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-col text-right">
            <p className="">
              <span>₹</span>
              {getDiscountedPrice(
                item.price,
                item.discountPercentage,
                quantity
              )}
            </p>
            <p className="text-gray-400 line-through text-sm">
              ₹{(item.price * quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() =>
              dispatch(
                user
                  ? deleteItemFromCartAsync(item.id)
                  : deleteItemFromCartIDBAsync(item.id)
              )
            }
            type="button"
            className="font-medium text-customBlue dark:text-blue-400 text-sm "
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
