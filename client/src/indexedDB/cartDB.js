import { getTransaction, CART_STORE_NAME } from ".";

// add/update items to cart
export const addToCart = async (item) => {
  try {
    const store = await getTransaction(CART_STORE_NAME, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve("Item added successfully");
      request.onerror = () => reject("Failed to add item");
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Get all cart items
export async function getCartItems() {
  try {
    const store = await getTransaction(CART_STORE_NAME, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to fetch cart items");
    });
  } catch (error) {
    console.error("Error getting items from cart:", error);
    throw error;
  }
}

// Remove an item from the cart
export async function removeFromCart(itemId) {
  try {
    const store = await getTransaction(CART_STORE_NAME, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(itemId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to remove item from cart");
    });
  } catch (error) {
    console.error("Error removing items from cart:", error);
    throw error;
  }
}

// Clear the cart
export async function clearCart() {
  try {
    const store = await getTransaction(CART_STORE_NAME, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to clear cart");
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}
