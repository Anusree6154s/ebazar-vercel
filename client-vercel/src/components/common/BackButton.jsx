import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function BackButton({ path }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path ?? -1)}
      className="p-2 mb-4 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 flex w-fit items-center gap-2 cursor-pointer"
    >
      <ArrowLeftIcon className="h-4 w-4 inline " />
      <span>Back</span>
    </div>
  );
}
