import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectLoggedInUser,
  updateCartAsync,
} from "../../../redux";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);

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
              <a href={item.href}>{item.brand}</a>
            </h5>
          </div>
          <p className="text-gray-500 text-sm">
            <label className="mr-3 dark:text-gray-300">Qty</label>
            <select
              onChange={(e) => {
                if (user) {
                  dispatch(
                    updateCartAsync({
                      ...item,
                      product: item.id,
                      quantity: +e.target.value,
                    }),
                  );
                } else {
                  dispatch();
                }
              }}
              className="py-0 rounded-md dark:text-gray-200 dark:bg-gray-700 focus:outline-none"
              value={item.quantity}
              name=""
              id=""
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="ml-4">₹ {item.price * (item.quantity || 1)}</p>
          <button
            onClick={() => dispatch(deleteItemFromCartAsync(item.id))}
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
