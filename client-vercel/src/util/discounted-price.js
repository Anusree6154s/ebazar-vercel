export function getDiscountedPrice(price, discountPercentage) {
  return (price - price * (discountPercentage / 100)).toFixed(2);
}
