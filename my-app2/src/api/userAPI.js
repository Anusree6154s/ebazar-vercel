// import { BASE_URL } from "../app/constants";
// import { handleError } from "./apiErrorHandler";

// export function fetchLoggedInUser() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(BASE_URL + "/users/user/", {
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         reject(handleError(response, data));
//       }
//       resolve({ data });
//     } catch (error) {
//       reject(handleError(error));
//     }
//   });
// }

// export function fetchLoggedInUserOrders(userId) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(BASE_URL + "/orders?user=" + userId, {
//       credentials: "include",
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }
import { BASE_URL } from "../app/constants";
import { handleError } from "./apiErrorHandler";

export async function fetchLoggedInUser() {
  try {
    const response = await fetch(BASE_URL + "/users/user/", {
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw handleError(response, data);
    }

    return { data };
  } catch (error) {
    throw handleError(error);
  }
}

export async function fetchLoggedInUserOrders(userId) {
  const response = await fetch(BASE_URL + "/orders?user=" + userId, {
    credentials: "include",
  });
  const data = await response.json();
  return { data };
}
