import {
  HeartIcon as HeartIconSolid,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { forwardRef } from "react";

const CustomSnackbar = forwardRef(({ id, message, variant }, ref) => {
  const backgroundColors = {
    AddedToWishlist: "dark:bg-pink-400 bg-pink-600",
    AlreadyInWishlist: "dark:bg-yellow-400 bg-yellow-600",
    AddedToCart: "dark:bg-green-400 bg-green-600",
  };

  const icons = {
    AddedToWishlist: <HeartIconSolid className="w-8 h-8" />,
    AlreadyInWishlist: <CheckCircleIcon className="w-8 h-8" />,
    AddedtoCart: <ExclamationCircleIcon className="w-8 h-8" />,
  };
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 text-white px-4 py-3 rounded-lg font-bold ${backgroundColors[variant]}`}
    >
      {icons[variant]}
      {message}
    </div>
  );
});
export default CustomSnackbar;
