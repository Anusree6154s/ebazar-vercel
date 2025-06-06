import { useDispatch } from "react-redux";
import { deleteItemFromCartAsync, updateCartAsync } from "../../../redux";

export default function CheckoutPageCartList({ item }) {
  const dispatch = useDispatch();
  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({
        ...item,
        product: item.product.id,
        quantity: +e.target.value,
      })
    );
  };
  const handleDelete = (item) => dispatch(deleteItemFromCartAsync(item.id));

  return (
    <li key={item.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
            <h3>
              <a href={item.product.id}>{item.product.title}</a>
            </h3>
            <p className="ml-4 whitespace-nowrap">
              ₹ {item.product.price * item.quantity}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between  text-sm ">
          <p className="text-gray-500 dark:text-gray-300 ">
            <label className="mr-3 ">Qty</label>
            <select
              onChange={(e) => handleQuantity(e, item)}
              className="py-0 rounded-md dark:bg-gray-800"
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

