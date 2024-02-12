import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE } from "../constants";


export async function createBoardCard(boardListId,boardCard) {
  const url = `${URL_BASE}/board_list/${boardListId}`;
  const token = authProvider.token;

  const options = {
    method: "POST",
    body: JSON.stringify(boardCard),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}