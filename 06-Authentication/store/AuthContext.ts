import { createContext } from "react";
import { userToken } from "../api/model/apimodel";
import AuthContent from "../components/auth/AuthContent";

export interface AuthUserState {
  userAuthToken: string | undefined;
  isAuthenticated: boolean;
}
export interface AuthContentValue {
  state: AuthUserState;
  dispatch: React.Dispatch<AuthenticationActions>;
}

export enum AuthActionType {
  Login = "LOGIN",
  Logout = "LOGOUT",
}

type AuthPayload = {
  [AuthActionType.Login]: string;
  [AuthActionType.Logout]: void;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthenticationActions =
  ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const AuthContext = createContext<AuthContentValue>({
  state: {
    userAuthToken: undefined,
    isAuthenticated: false,
  },
  dispatch: () => {},
});
