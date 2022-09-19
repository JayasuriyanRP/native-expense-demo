import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../store/AuthContext";

const WelcomeScreen = () => {
  const [fetchedMessage, setFetchedMessage] = useState();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        `https://reactnative-expense-1e49f-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${authContext.state.userAuthToken}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;
