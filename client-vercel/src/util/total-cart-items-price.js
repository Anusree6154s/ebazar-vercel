export const getTotalCartItemsPrice = (items, isLoggedIn) => {
  const totalPrice = items.reduce((amount, item) => {
    const price = isLoggedIn ? item.product.price : item.price;
    const quantity = item.quantity || 1;
    return price * quantity + amount;
  }, 0);

  return items.length > 0 ? totalPrice.toFixed(2) : 0;
};
