import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  onPress: () => void;
  color: string;
  isFav: boolean;
}

const IconButton = ({ onPress, color, isFav }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Ionicons
        name={isFav ? "star" : "star-outline"}
        size={24}
        color={color}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
