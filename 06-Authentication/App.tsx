import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./Stacks/AuthStack";
import AuthProvider from "./store/AuthProvider";
import { useContext, useEffect } from "react";
import AuthContent from "./components/auth/AuthContent";
import { AuthActionType, AuthContext } from "./store/AuthContext";
import AuthenticatedStack from "./Stacks/AuthenticatedStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const Navigation = () => {
  const authContext = useContext(AuthContext);
  console.log("App Reloaded", authContext.state);

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    setIsAppLoading(true);
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        console.log(token, "-Called from internal storage");
        authContext.dispatch({
          type: AuthActionType.Login,
          payload: token ?? "",
        });
      }
      setIsAppLoading(false);
    });
  }, []);

  if (isAppLoading) {
    return <LoadingSpinner message="App is Loading" />;
  }

  return (
    <NavigationContainer>
      {!authContext.state.isAuthenticated && <AuthStack />}
      {authContext.state.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
