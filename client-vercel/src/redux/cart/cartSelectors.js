export const selectCartItems = (state) => state.cart.items
export const selectCartStatus = (state) => state.cart.status

export const selectIsCartIDBEmpty = (state) =>
  state.cart.isCartIDBEmpty;