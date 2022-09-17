import { FC } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import MealDetails from "../MealDetails";

interface MealItemProps {
  title: string;
  imageUri: string;
  duration: number;
  complexity: string;
  affordability: string;
  onPress: () => void;
}

const MealItem: FC<MealItemProps> = ({
  title,
  imageUri,
  duration,
  complexity,
  affordability,
  onPress,
}) => {
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={onPress}
      >
        <View style={{ borderRadius: 8, overflow: "hidden" }}>
          <View>
            <Image style={styles.image} source={{ uri: imageUri }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default MealItem;
