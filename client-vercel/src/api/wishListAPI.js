import { BASE_URL } from "../app/constants";

export async function addToWishList(item) {
  return fetch(BASE_URL + "/wishlist", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      return { data };
    });
}

export async function addToWishListMany(items) {
  return fetch(BASE_URL + "/wishlist/many", {
    method: "POST",
    body: JSON.stringify(items),
    headers: { "content-type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      return { data };
    });
}

export async function fetchWishListByUserId() {
  return fetch(BASE_URL + "/wishlist", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      return { data };
    });
}

export async function deleteItemFromWishList(itemId) {
  return fetch(BASE_URL + "/wishlist/" + itemId, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => ({ data }));
}
