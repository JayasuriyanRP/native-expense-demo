import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4,

    // Shadow for IOS
    shadowColor: "#ffff",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
});
export default Card;
