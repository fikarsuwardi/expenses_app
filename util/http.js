import axios from 'axios';

const BACKEND_URL = "https://expenses-app-34eae-default-rtdb.asia-southeast1.firebasedatabase.app/";

// export async function storeExpense(expenseData) {
//   const response = await fetch(`${BACKEND_URL}/expenses.json`, {
//     method: 'POST',
//     body: JSON.stringify(expenseData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
 
//   const id = data.name;
//   return id;
// }

// export async function fetchExpenses() {
//     const response = await fetch(`${BACKEND_URL}/expenses.json`);
//     const data = await response.json();
   
//     return Object.entries(data).map(([id, expenseData]) => {
//       return { id: id, ...expenseData, date: new Date(expenseData.date) };
//     });
//   }
   
//   export function updateExpense(id, expenseData) {
//     return fetch(`${BACKEND_URL}/expenses/${id}.json`, {
//       method: 'PUT',
//       body: JSON.stringify(expenseData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
//   export function deleteExpense(id) {
//     return fetch(`${BACKEND_URL}/expenses/${id}.json`, {
//       method: 'DELETE',
//     });
//   }

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}