import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE } from "../constants";

export async function getBoards(sortyBy=null,order=null) {
  const token = authProvider.token;
  let url = `${URL_BASE}/`;

  if(sortyBy && order){
    url+=`?sortyBy=${sortyBy}&order=${order}`
  }
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    //authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
export async function createBoard(board) {
  const url = `${URL_BASE}/`;
  const token = authProvider.token;

  const options = {
    method: "POST",
    body: JSON.stringify(board),
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