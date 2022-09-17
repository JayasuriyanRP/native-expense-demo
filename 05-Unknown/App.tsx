import { StatusBar } from "expo-status-bar";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import { useState } from "react";
import {
  Button,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import GoalInput from "./components/goalInput";
import GoalItem from "./components/goalItem";
type GoalItem = {
  goalName: string;
  key: number;
};

export default function App() {
  const [allGoals, setAllGoals] = useState<GoalItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleGoalAdded = (goalName: string) => {
    setAllGoals((previous) => [
      ...previous,
      { goalName: goalName, key: Math.random() },
    ]);
    endModalState();
  };

  const handleDeleteItem = (id: number) => {
    setAllGoals((previous) => {
      return previous.filter((x) => x.key !== id);
    });
  };

  const startModalState = () => {
    setIsModalVisible(true);
  };

  const endModalState = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Button
          title="Add new Goal"
          color={"#5e0acc"}
          onPress={startModalState}
        />
        <GoalInput
          goalAdded={handleGoalAdded}
          isVisible={isModalVisible}
          onCloseModal={endModalState}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={allGoals}
            renderItem={(itemData) => (
              <GoalItem
                id={itemData.item.key}
                goalName={itemData.item.goalName}
                onDeleteItem={handleDeleteItem}
              />
            )}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 8,
    flex: 1,
  },

  goalsContainer: {
    flex: 6,
  },
});
