// import { BASE_URL } from "../app/constants";

// export function createUser(userData) {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch(BASE_URL + "/auth/signup", {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: { "content-type": "application/json" },
//       credentials: "include",
//     });
//     if(response.ok){
//       const data = await response.json();
//       resolve({ data });
//     }else{
//       const error = await response.json();
//       reject(error)
//     }
//   });
// }

// export function LoginUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo.email;
//     const password = loginInfo.password;
//     const response = await fetch(BASE_URL + "/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "content-type": "application/json" },
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       resolve({ data });
//     } else {
//       const error = await response.json();
//       reject(error);
//     }
//   });
// }

// export function checkAuth() {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch(BASE_URL + "/auth/check", {
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       resolve({ data });
//     } else {
//       const error = await response.json();
//       reject(error);
//     }
//   });
// }

// export function sendOTP(item) {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch(BASE_URL + "/auth/sendOTP", {
//       method: "POST",
//       body: JSON.stringify(item),
//       headers: { "content-type": "application/json" },
//       credentials: "include",
//     });
//     // if (response.ok) {
//     //   const data = await response.json()
//     //   resolve({ data })
//     // } else {
//     //   const error = await response.json();
//     //   reject({ error })
//     // }

//     if (response.ok) {
//       const data = await response.json();
//       resolve({ data });
//     } else {
//       const error = await response.json();
//       reject(error);
//     }
//   });
// }

// export function resetPassword(item) {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch(
//       BASE_URL + "/auth/resetpassword/" + item.userId,
//       {
//         method: "PATCH",
//         body: JSON.stringify({ password: item.password }),
//         headers: { "content-type": "application/json" },
//         credentials: "include",
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       resolve({ data });
//     } else {
//       const error = await response.json();
//       reject({ error });
//     }
//   });
// }

// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(BASE_URL + "/users/user/" + update.id, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "content-type": "application/json" },
//       credentials: "include",
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function signOut() {
//   return new Promise(async (resolve, reject) => {
//     const response = await fetch(BASE_URL + "/auth/logout", {
//       credentials: "include",
//     });
//     if (response.ok) {
//       resolve({ data: "signout success" });
//     } else {
//       reject({ data: "signout error" });
//     }
//   });
// }

import { BASE_URL } from "../app/constants";

export async function createUser(userData) {
  const response = await fetch(BASE_URL + "/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return { data };
  } else {
    throw data;
  }
}

export async function LoginUser(loginInfo) {
  const { email, password } = loginInfo;
  const response = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return { data };
  } else {
    throw data;
  }
}

export async function checkAuth() {
  const response = await fetch(BASE_URL + "/auth/check", {
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return { data };
  } else {
    throw data;
  }
}

export async function sendOTP(item) {
  const response = await fetch(BASE_URL + "/auth/sendOTP", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return { data };
  } else {
    throw data;
  }
}

export async function resetPassword(item) {
  const response = await fetch(BASE_URL + "/auth/resetpassword/" + item.userId, {
    method: "PATCH",
    body: JSON.stringify({ password: item.password }),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return { data };
  } else {
    throw data;
  }
}

export async function updateUser(update) {
  const response = await fetch(BASE_URL + "/users/user/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();
  return { data };
}

export async function signOut() {
  const response = await fetch(BASE_URL + "/auth/logout", {
    credentials: "include",
  });

  if (response.ok) {
    return { data: "signout success" };
  } else {
    throw { data: "signout error" };
  }
}
