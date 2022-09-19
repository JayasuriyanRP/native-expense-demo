import {
  AuthContentValue,
  AuthenticationActions,
  AuthUserState,
} from "./AuthContext";
import { userToken } from "../api/model/apimodel";
import { AuthActionType } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthReducer = (
  state: AuthUserState,
  action: AuthenticationActions
) => {
  console.log("Reducer Called", action.payload);
  switch (action.type) {
    case AuthActionType.Login:
      AsyncStorage.setItem("token", action.payload);
      return {
        isAuthenticated: true,
        userAuthToken: action.payload,
      };

    case AuthActionType.Logout:
      AsyncStorage.removeItem("token");
      return {
        isAuthenticated: false,
        userAuthToken: undefined,
      };
    default:
      return state;
  }
};
