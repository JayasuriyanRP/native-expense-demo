import { View, Text, StyleSheet, TextStyle } from "react-native";
import Colors from "../../constants/colors";

interface InstructionTextProps {
  title: string;
  style?: TextStyle;
}

const InstructionText: React.FC<InstructionTextProps> = ({
  children,
  title,
  style,
}) => {
  return <Text style={[styles.instructions, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  instructions: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
  },
});

export default InstructionText;
