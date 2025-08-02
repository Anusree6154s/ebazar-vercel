import { BASE_URL } from "../app/constants";

export function addToWishList(item) {
  // return new Promise(async (resolve) => {
  //   const response = await fetch(BASE_URL + '/wishlist', {
  //     method: 'POST',
  //     body: JSON.stringify(item),
  //     headers: { 'content-type': 'application/json' },
  //     credentials: 'include',
  //   });
  //   const data = await response.json();
  //   console.log('wishlist api data', data)
  //   resolve({ data });
  // });

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
export function fetchWishListByUserId() {
  // return new Promise(async (resolve) => {
  //   const response = await fetch(BASE_URL + '/wishlist', { credentials: 'include', })
  //   const data = await response.json()
  //   console.log('wishlit data', data)
  //   resolve({ data })
  // });
  return fetch(BASE_URL + "/wishlist", { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      console.log("wishlist data", data);
      return { data };
    });
}

export function deleteItemFromWishList(itemId) {
  // return new Promise(async (resolve) => {
  //   const response = await fetch(BASE_URL + '/wishlist/' + itemId, {
  //     method: 'DELETE',
  //     headers: { 'content-type': 'application/json' },
  //     credentials: 'include',
  //   });
  //   const data = await response.json();
  //   resolve({ data });
  // });
  return fetch(BASE_URL + "/wishlist/" + itemId, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => ({ data }));
}
