import React from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCartAsync, updateCartAsync } from "../../../redux";
import { Link, useNavigate } from "react-router-dom";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-500">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="h-full w-full object-cover object-center"
          onClick={() => navigate(`/product-detail/${item.product.id}`)}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
            <h3>
              <a href={item.href}>{item.product.title}</a>
            </h3>
            <p className="ml-4">₹ {item.product.price * item.quantity}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 ">
            <label className="mr-3 dark:text-gray-300">Qty</label>
            <select
              onChange={(e) =>
                dispatch(
                  updateCartAsync({
                    ...item,
                    product: item.product.id,
                    quantity: +e.target.value,
                  })
                )
              }
              className="py-0 rounded-md dark:text-gray-200 dark:bg-gray-700"
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
              onClick={() => dispatch(deleteItemFromCartAsync(item.id))}
              type="button"
              className="font-medium text-customBlue dark:text-blue-400 "
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
