import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
          className="h-full w-full object-cover object-center"
          onClick={() => navigate(`/product-detail/${item.id}`)}
        />
      </div>

      <div className="ml-4 flex flex-1 justify-between text-base font-medium text-gray-900 dark:text-gray-300">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h3>
              <a href={item.href}>{item.title}</a>
            </h3>
            <h5 className="text-gray-400 font-bold text-xs uppercase">
              <a href={item.href}>{item.brand || "No Brand"}</a>
            </h5>
          </div>
          <div className="text-gray-500 text-sm inline-block">
            <label className="mr-3 dark:text-gray-300">Qty</label>
            {/* <select
              onChange={(e) => {
                if (user) {
                  dispatch(
                    updateCartAsync({
                      id: itemId,
                      product: item.id,
                      quantity: +e.target.value,
                      user: user.id,
                    })
                  );
                } else {
                  dispatch(
                    updateCartIDBAsync({
                      ...item,
                      product: item.id,
                      quantity: +e.target.value,
                    })
                  );
                }
              }}
              className="py-0 rounded-md dark:text-gray-200 dark:bg-gray-700 focus:outline-none"
              value={quantity}
              name=""
              id=""
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select> */}
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
