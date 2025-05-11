export const getTotalCartItemsPrice = (items) => {
  return items.length > 0
    ? Number(
        items
          .reduce(
            (amount, item) => item.product.price * item.quantity + amount,
            0
          )
          .toFixed(2)
      )
    : 0;
};
