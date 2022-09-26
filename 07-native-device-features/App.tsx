import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PlacesNavStack from "./Stack/PlacesNavStack";

export default function App() {
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
