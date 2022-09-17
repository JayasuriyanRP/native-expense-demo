import { Text, View, StyleSheet } from "react-native";

interface ListProps {
  items: string[];
}

const List = ({ items }: ListProps) => {
  return (
    <>
      {items.map((item) => (
        <View style={styles.listitem} key={item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  listitem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});

export default List;
