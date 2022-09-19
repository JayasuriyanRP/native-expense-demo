import axios from "axios";
import { userToken } from "./model/apimodel";
import { signupUserRequest, signinUserResponse } from "./model/apimodel";

function authenticate<T>(
  mode: "signUp" | "signInWithPassword",
  userInfo: IUserCredential
) {
  const API_KEY = "AIzaSyDoHDXUJJj3c3h2-HgcooMNDSbaPe_cEcw";
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  return axios.post<T>(url, { ...userInfo, returnSecureToken: true });
}

export async function signupUser(userInfo: IUserCredential) {
  const userToken = await authenticate<any>("signUp", userInfo);
  return userToken.data.idToken;
}

export async function signInUser(userInfo: IUserCredential) {
  const userToken = await authenticate<any>("signInWithPassword", userInfo);

  return userToken.data.idToken;
}
