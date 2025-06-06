import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function RatingStars({ rating }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => {
        const isFullStar = rating >= index + 1;
        return (
          <span key={index}>
            {isFullStar ? (
              <StarIconSolid className="text-yellow-400 h-6 w-6 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
            ) : (
              <StarIconOutline className="text-gray-300 dark:text-yellow-700 h-6 w-6 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
            )}
          </span>
        );
      })}
    </>
  );
}
