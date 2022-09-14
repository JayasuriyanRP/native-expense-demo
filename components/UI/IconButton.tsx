import { StyleSheet, View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: any;
  size: number;
  color: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  size,
  color,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default IconButton;
