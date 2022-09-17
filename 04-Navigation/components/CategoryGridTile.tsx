import { FC } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  Platform,
} from "react-native";

interface CategoryGridTileProps {
  title: string;
  color: string;
  onPress: () => void;
}

const CategoryGridTile: FC<CategoryGridTileProps> = ({
  title,
  color,
  onPress,
}) => {
  const { height, width } = useWindowDimensions();

  const gridItemDimStyle: ViewStyle = {
    height: height < 700 ? 120 : 150,
    margin: width > 420 ? 16 : 10,
  };

  return (
    <View style={[styles.gridItem, gridItemDimStyle]}>
      <Pressable
        android_ripple={{ color: "#cccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CategoryGridTile;
