import { View, Text, StyleSheet } from "react-native";

interface SubTitleProps {
  title: string;
}

const SubTitle = ({ title }: SubTitleProps) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
  subTitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SubTitle;
