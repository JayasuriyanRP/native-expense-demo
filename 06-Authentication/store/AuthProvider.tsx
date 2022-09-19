import {
  AuthContentValue,
  AuthContext,
  AuthUserState,
  AuthActionType,
} from "./AuthContext";
import { useReducer, useEffect } from "react";
import { AuthReducer } from "./AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [stateResult, dispatchResult] = useReducer(AuthReducer, {
    isAuthenticated: false,
    userAuthToken: undefined,
  } as AuthUserState);

  return (
    <AuthContext.Provider
      value={{
        state: stateResult,
        dispatch: dispatchResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
