export const getTotalCartItemsCount=(items)=>{
    return  items.length > 0
    ? items.reduce((amount, item) => item.quantity + amount, 0)
    : 0;
}