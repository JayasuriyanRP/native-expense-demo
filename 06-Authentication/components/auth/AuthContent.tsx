import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "../../constants/styles";
import FlatButton from "../ui/FlatButton";
import { useState } from "react";
import AuthForm from "./AuthForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../Stacks/AuthStack";
import { useNavigation } from "@react-navigation/native";

interface AuthContentProps {
  isLogin: boolean;
  onAuthenticate: (credentials: IUserCredential) => void;
}

type AuthNavProps = NativeStackNavigationProp<AuthStackParamList, "Login">;

const AuthContent: React.FC<AuthContentProps> = ({
  isLogin,
  onAuthenticate,
}) => {
  const [credentialsInvalid, setCredentialsInvalid] =
    useState<ICredentialsValidation>({
      confirmEmail: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

  const navigation = useNavigation<AuthNavProps>();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
    // Todo
  }

  function submitHandler(credentials: IAuthCredentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});

export default AuthContent;
