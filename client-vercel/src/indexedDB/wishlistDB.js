import { getTransaction, WISHLIST_STORE_NAME } from ".";

// add/update items to wishlist
export const addToWishlistIDB = async (item) => {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve(item);

      request.onerror = () => reject("Failed to add item");
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Get all wishlist items
export async function getWishlistItemsIDB() {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to fetch wishlist items");
    });
  } catch (error) {
    console.error("Error getting items from wishlist:", error);
    throw error;
  }
}

// Get the count of wishlist items (without fetching them)
export async function getWishlistItemsCountIDB() {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to count wishlist items");
    });
  } catch (error) {
    console.error("Error counting items in wishlist:", error);
    throw error;
  }
}

// Remove an item from the wishlist
export async function removeFromWishlistIDB(itemId) {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(itemId);
      request.onsuccess = () => resolve(itemId);

      request.onerror = () => reject("Failed to remove item from wishlist");
    });
  } catch (error) {
    console.error("Error removing items from wishlist:", error);
    throw error;
  }
}

// Clear the wishlist
export async function clearWishlistIDB() {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readwrite");

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () =>
        resolve("Items cleared from wishlist successfully");
      request.onerror = () => reject("Failed to clear wishlist");
    });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    throw error;
  }
}

export async function existsInWishlistIDB(productId) {
  try {
    const store = await getTransaction(WISHLIST_STORE_NAME, "readonly");
    return new Promise((resolve, reject) => {
      const request = store.get(productId);
      request.onsuccess = () => resolve(!!request.result);
      // If product exists, return true; otherwise, false
      request.onerror = () =>
        reject("Failed to check exitence of product in wishlist");
    });
  } catch (error) {
    console.error("Error check exitence of product in wishlist:", error);
    throw error;
  }
}
