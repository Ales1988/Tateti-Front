import axios from "axios";
import { environment } from "../app/environment/environment";
import { cleanupSessionUser, updateSessionUser } from "../store/userStore";
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json";

//DEFINO ESTRUCTURA PARA UN USER
export interface User {
  id: number;
  name: string;
  password: string;
  token: string;
}

//LOGIN
export async function login(params: {
  login: string;
  password: string;
}): Promise<User> {
  const res = (
    await axios.get(environment.backendUrl + "/players/" + params.login)
  ).data; //estoy usando como id el nombre...en route del back tengo /id...no le importa si es la id del istancia player...simplemente es un valor que usa como id.
  //Axios me retorna en res el objet player de mi BackEnd. Entonces para acceder a los attributos necesito res.players.attributo
  let user: User = {
    id: res.player.id,
    name: res.player.name,
    password: res.player.password,
    token: res.player.token,
  };

  //Controlo que la password ingresada en el front coresponda con la que me da el back
  if (res.player.password === params.password) {
    updateSessionUser(user);
  } else {
    alert("Password sbagliata!"); //Potrei migliorarlo
  }

  return res;
}

//CREA NUEVO USUARIO
export async function newUser(params: {
  name: string;
  password: string;
}): Promise<User> {
  const res = (await axios.post(environment.backendUrl + "/players", params))
    .data;
  //Axios me retorna en res el objet player de mi BackEnd. Entonces para acceder a los attributos necesito res.players.attributo
  let user: User = {
    id: res.player.id,
    name: res.player.name,
    password: res.player.password,
    token: res.player.token,
  };
  updateSessionUser(user);
  return res;
}

export async function logout(): Promise<void> {
  cleanupSessionUser();
}
