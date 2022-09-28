import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PlacesNavStack from "./Stack/PlacesNavStack";
import { useEffect } from "react";
import { init } from "./util/database";
import { useState } from "react";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch(() => {
        setDbInitialized(true);
      });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <PlacesNavStack />
      </NavigationContainer>
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
