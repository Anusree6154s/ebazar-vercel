import { useNavigate } from "react-router-dom";

export default function AdminProductDetailUpdateButtons({ product, handleDelete }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center">
      <button
        className="p-2 block items-center rounded-md h-10 bg-customBlue dark:bg-blue-500 text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-blue-600 focus:ring-offset-2"
        onClick={() =>
          navigate(`/admin/edit-product-form/${product.id}?path=productPage`)
        }
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="p-2 ml-2 rounded-md h-10 bg-red-500 dark:bg-red-800  text-sm font-medium text-white bg-opacity-90 hover:bg-opactiy-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-customBlue dark:focus:ring-red-800 focus:ring-offset-2 "
      >
        Delete
      </button>
    </div>
  );
}
