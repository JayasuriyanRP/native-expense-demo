import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface GoalItemProps {
  goalName: string;
  id: number;
  onDeleteItem: (id: number) => void;
}

const GoalItem = ({ id, goalName, onDeleteItem }: GoalItemProps) => {
  const handleDeleteItem = () => {
    onDeleteItem(id);
  };
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: "#dddddd",
        }}
        onPress={onDeleteItem.bind(this, id)}
      >
        <Text style={styles.text}>{goalName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#5e0acc",
  },
  text: {
    padding: 8,
    color: "white",
  },
});

export default GoalItem;
