import { useState, useContext } from "react";
import { signInUser, signupUser } from "../api/auth";
import AuthContent from "../components/auth/AuthContent";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Alert } from "react-native";
import { AuthActionType, AuthContext } from "../store/AuthContext";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const authContext = useContext(AuthContext);

  async function handleAuthentication(userInfo: IUserCredential) {
    try {
      setIsAuthenticating(true);
      const idToken = await signInUser(userInfo);
      authContext.dispatch({
        type: AuthActionType.Login,
        payload: idToken,
      });
    } catch (err) {
      setError("Error when logging in the user");
      console.log(err, "Component");
      Alert.alert("Authentication failed", "Could not Login the user");
      setError(undefined);
      setIsAuthenticating(false);
    }
  }

  // if (error && !isAuthenticating) {
  //   return (
  //     <></>
  //     // <ErrorOverlay message={error} onConfirm={() => setError(undefined)} />
  //   );
  // }
  if (isAuthenticating) {
    return <LoadingSpinner message="Signing in" />;
  }
  return <AuthContent isLogin={true} onAuthenticate={handleAuthentication} />;
};

export default LoginScreen;
