import { View, StyleSheet, Pressable, Text, ViewStyle } from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  mode?: "flat" | "normal";
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.container, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.faltText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  faltText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
  },
});
export default Button;
