import { Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "open-sans-bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.select({ ios: 5, android: 1.5 }),
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
    borderRadius: 10,
  },
});

export default Title;
