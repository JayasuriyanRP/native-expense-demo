import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

interface ErrorOverlayProps {
  message: string;
  onConfirm: () => void;
}
const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An Error Occurred !</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default ErrorOverlay;
