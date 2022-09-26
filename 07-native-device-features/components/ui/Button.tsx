import { Pressable, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { Colors } from "../../constants/styles";

interface ButtonProps {
  children: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    elevation: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary50,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: Colors.primary800,
    paddingVertical: 8,
  },
});

export default Button;
