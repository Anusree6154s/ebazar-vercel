export const getTotalCartItemsPrice = (items) => {
  return items.length > 0
    ? Number(
        items
          .reduce(
            (amount, item) => item.price * (item.quantity || 1) + amount,
            0,
          )
          .toFixed(2),
      )
    : 0;
};
