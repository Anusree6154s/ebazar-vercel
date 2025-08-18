import { useState } from "react";

export default function useFilters() {
  const [filter, setFilter] = useState({});
  const [filterFlag, setFilterFlag] = useState(false);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      let index = newFilter[section.id].findIndex(
        (item) => item === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
    setFilterFlag(
      (newFilter["brand"] && newFilter.brand.length !== 0) ||
        (newFilter["category"] && newFilter.category.length !== 0)
    );
  };

  return { filter, setFilter, filterFlag, handleFilter };
}
