import { signupUser } from "../api/auth";
import AuthContent from "../components/auth/AuthContent";
import { useState, useContext } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { Alert } from "react-native";
import { AuthActionType, AuthContext } from "../store/AuthContext";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const authContext = useContext(AuthContext);

  async function handleAuthentication(userInfo: IUserCredential) {
    try {
      setIsAuthenticating(true);
      const token = await signupUser(userInfo);
      authContext.dispatch({
        type: AuthActionType.Login,
        payload: token,
      });
    } catch (err) {
      setError("Error when creating the user");
      console.log(err);
      Alert.alert("Authentication failed", "Could not Signup the user");
      setError(undefined);
      setIsAuthenticating(false);
    }
  }

  // if (error && !isAuthenticating) {
  //   return (
  //     <>
  //       {/* <ErrorOverlay message={error} onConfirm={() => setError(undefined)} /> */}
  //     </>
  //   );
  // }
  if (isAuthenticating) {
    return <LoadingSpinner message="Signing Up" />;
  }

  return <AuthContent isLogin={false} onAuthenticate={handleAuthentication} />;
};

export default SignupScreen;
