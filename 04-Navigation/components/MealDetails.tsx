import { FC } from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface MealsDetailsProps {
  duration: number;
  complexity: string;
  affordability: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const MealDetails: FC<MealsDetailsProps> = ({
  duration,
  complexity,
  affordability,
  viewStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.details, viewStyle]}>
      <Text style={[styles.detailItem, textStyle]}>{duration} min</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>
        {affordability.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});

export default MealDetails;
