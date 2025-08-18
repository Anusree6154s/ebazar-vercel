import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { selectPage, setPage } from "../../../redux";
import { DesktopPagination } from "./DesktopPagination";
import { MobilePagination } from "./MobilePagination";

export default function Pagination({ totalItems }) {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const [pageBoundary, setPageBoundary] = useState({
    start: 1,
    end: 10,
    index: 0,
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startItems = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItems =
    page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE;

  const handlePrev = () => {
    dispatch(setPage(page > 1 ? page - 1 : page));
    if (page === pageBoundary.start && page !== 1)
      setPageBoundary({
        start: pageBoundary.start - 1,
        end: pageBoundary.end - 1,
        index: pageBoundary.index - 1,
      });
  };

  const handleNext = () => {
    dispatch(setPage(page < totalPages ? page + 1 : page));
    if (page === pageBoundary.end && page !== totalPages)
      setPageBoundary({
        start: pageBoundary.start + 1,
        end: pageBoundary.end + 1,
        index: pageBoundary.index + 1,
      });
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-transparent dark:border-transparent  pt-6 ">
      <MobilePagination
        dispatch={dispatch}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <DesktopPagination
        startItems={startItems}
        endItems={endItems}
        totalItems={totalItems}
        handlePrev={handlePrev}
        page={page}
        dispatch={dispatch}
        pageBoundary={pageBoundary}
        handleNext={handleNext}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
