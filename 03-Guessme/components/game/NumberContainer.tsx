import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Colors from "../../constants/colors";

interface NumberContainerProps {}

const deviceInfo = Dimensions.get("window");

const NumberContainer: React.FC<NumberContainerProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceInfo.width < 380 ? 12 : 24,
    margin: deviceInfo.width < 380 ? 12 : 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    // fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
export default NumberContainer;
