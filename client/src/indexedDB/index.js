export const DB_NAME = "EbazarDB";
export const CART_STORE_NAME = "cart";
export const WISHLIST_STORE_NAME = "cart";
export const DB_VERSION = 1;

//open or create cart indexedDB
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(CART_STORE_NAME)) {
        db.createObjectStore(CART_STORE_NAME, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(WISHLIST_STORE_NAME)) {
        db.createObjectStore(WISHLIST_STORE_NAME, { keyPath: "id" });
      }

    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getTransaction = async (storeName, mode) => {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, mode);
  return transaction.objectStore(storeName);
};