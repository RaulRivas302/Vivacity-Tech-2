import { Person } from "../types/Person";

const BASE_URL = "http://localhost:3000";

export const getPerson = async () => {
  const response = await fetch(`${BASE_URL}/awesome/applicant/2`);
  const data = await response.json();
  return data;
};

// export const createPerson = async (person: Person) => {
//   const response = await fetch(`${BASE_URL}/awesome/applicant`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(person),
//   });
//   const data = await response.json();
//   return data;
// };

export const updatePerson = async (id: number, person: Person) => {
  const response = await fetch(`${BASE_URL}/awesome/applicant/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  const data = await response.json();
  return data;
};

// export const deletePerson = async (id: number) => {
//   await fetch(`${BASE_URL}/awesome/applicant/${id}`, {
//     method: "DELETE",
//   });
// };
