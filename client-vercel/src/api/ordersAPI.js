// import { BASE_URL } from '../app/constants';

// export function createOrder(item) {
//     return new Promise(async (resolve) => {
//         const response = await fetch(BASE_URL + '/orders', {
//             method: 'POST',
//             body: JSON.stringify(item),
//             headers: { 'content-type': 'application/json' },
//             credentials: 'include',
//         })
//         const data = await response.json()
//         resolve({ data })
//     }
//     );
// }

// export function makePayment(item) {
//     return new Promise(async (resolve) => {
//         const response = await fetch(BASE_URL + '/payment/create-payment-intent', {
//             method: 'POST',
//             body: JSON.stringify(item),
//             headers: { 'content-type': 'application/json' },
//             credentials: 'include',
//         })
//         const data = await response.json()
//         resolve({ data: data.clientSecret })
//     }
//     );
// }
import { BASE_URL } from '../app/constants';

export async function createOrder(item) {
  const response = await fetch(BASE_URL + '/orders', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  });
  const data = await response.json();
  return { data };
}

export async function makePayment(item) {
  const response = await fetch(BASE_URL + '/payment/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  });
  const data = await response.json();
  return { data: data.clientSecret };
}
