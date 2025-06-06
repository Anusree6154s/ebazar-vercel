import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOrders, updateOrderAsync } from "../../redux";

export default function OrdersDashboard({ sort, setSort, page }) {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const [editStatusIndex, setEditStatusIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleUpdateOrder = (e, index) => {
    const order = { ...orders[index], status: e.target.value };
    dispatch(updateOrderAsync(order));
    setEditStatusIndex(null);
    setShow(false);
  };

  const handleSort = () => {
    sort._order === "asc"
      ? setSort({ _sort: "_id", _order: "desc" })
      : setSort({ _sort: "_id", _order: "asc" });
  };

  return (
    <table className="w-full lg:w-full min-h-screen overflow-auto table-auto bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 shadow-md my-6">
      <thead>
        <tr className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-center">Sr. No.</th>
          <th
            className="py-3 w-20 px-0 text-center md:px-6 md:w-auto cursor-pointer"
            onClick={handleSort}
          >
            Order Number
            {sort._order === "asc" ? (
              <ArrowUpIcon className="w-6 inline" />
            ) : (
              <ArrowDownIcon className="w-6 inline" />
            )}
          </th>
          <th className="py-3 px-6 text-left hidden lg:table-cell">Items</th>
          <th className="py-3 px-6 text-left hidden lg:table-cell">
            Total Amount
          </th>
          <th className="py-3 px-6 text-left hidden lg:table-cell">
            Shipping Address
          </th>
          <th className="py-3 px-6 text-center hidden lg:table-cell">
            Order Date
          </th>
          <th className="py-3 px-0 w-10 text-center md:px-6 md:w-auto">
            Status
          </th>
          <th className="py-3 px-0 w-10 text-center md:px-6 md:w-auto">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-600 dark:text-gray-400 text-sm  font-semibold ">
        {orders.map((order, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 dark: hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 cursor-auto"
          >
            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto ">
              <span className="font-medium ">
                {(page - 1) * 10 + index + 1}
              </span>
            </td>

            <td className="py-3 w-20 break-all px-0 text-center md:px-6 md:w-auto">
              <span className="font-medium">{order.id}</span>
            </td>

            <td className="py-3 px-6 text-left hidden lg:table-cell">
              {order.items.map((item, index) => (
                <div key={index} className="flex">
                  <div className="mr-2 ">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                  </div>
                  <span className="max-w-sm">{item.product.title}</span>
                </div>
              ))}
            </td>

            <td className="py-3 px-6 text-left whitespace-nowrap hidden lg:table-cell">
              <span className="font-medium ml-8">₹ {order.totalPrice}</span>
            </td>

            {order.selectedAddress && (
              <td className="py-3 px-6 text-left  hidden lg:table-cell">
                <div className="font-medium">
                  {order.selectedAddress.street}, {order.selectedAddress.city}
                </div>
                <div className="font-medium">
                  {order.selectedAddress.state}, {order.selectedAddress.country}
                </div>
                <div className="font-medium">
                  {order.selectedAddress.pincode}
                </div>
              </td>
            )}

            {order.date && (
              <td className="py-3 px-6 text-center whitespace-nowrap hidden lg:table-cell">
                <span className="font-medium">{order.date}</span>
              </td>
            )}

            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto">
              {show && editStatusIndex === index ? (
                <select
                  onChange={(e) => handleUpdateOrder(e, index)}
                  className="border border-gray-300 rounded-3xl dark:bg-gray-800 dark:border-gray-600 focus:ring-transparent"
                >
                  <option value="">--choose one--</option>
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dipatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              ) : (
                <span
                  className={`font-semibold ${
                    order.status === "Pending"
                      ? "bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs"
                      : order.status === "Dispatched"
                      ? "bg-yellow-200 text-yellow-900 py-1 px-3 rounded-full text-xs"
                      : "bg-green-200 text-green-900 py-1 px-3 rounded-full text-xs"
                  }`}
                >
                  {order.status}
                </span>
              )}
            </td>

            <td className="py-3  px-0 w-10 text-center md:px-6 md:w-auto">
              <PencilIcon
                className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 inline"
                onClick={() => {
                  setEditStatusIndex(index);
                  setShow(!show);
                }}
              ></PencilIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
