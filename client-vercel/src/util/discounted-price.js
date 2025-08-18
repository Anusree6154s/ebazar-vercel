export function getDiscountedPrice(price, discountPercentage, quantity) {
  const discount = price * (discountPercentage / 100);
  const discountedPrice = price - discount;
  const totalPrice = discountedPrice * (quantity || 1);
  return totalPrice.toFixed(2);
}
