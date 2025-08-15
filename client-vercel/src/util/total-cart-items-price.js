export const getTotalCartItemsPrice = (items, isLoggedIn) => {
  return items.length > 0
    ? Number(
        items
          .reduce((amount, item) => {
            const price = isLoggedIn ? item.product.price : item.price;
            return price * (item.quantity || 1) + amount;
          }, 0)
          .toFixed(2)
      )
    : 0;
};
