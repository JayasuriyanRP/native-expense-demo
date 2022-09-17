import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  GestureResponderEvent,
  Modal,
  Image,
} from "react-native";

interface GoalInputProps {
  goalAdded: (goalName: string) => void;
  isVisible: boolean;
  onCloseModal: () => void;
}

const GoalInput = ({ goalAdded, isVisible, onCloseModal }: GoalInputProps) => {
  const [enteredText, setEnteredText] = useState<string>("");

  const goalInputHandler = (input: string) => {
    setEnteredText(input);
  };

  const onAddGoalHandler = (event: GestureResponderEvent) => {
    if (enteredText) {
      goalAdded(enteredText);
      setEnteredText("");
    }
  };
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputConainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goals.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Goals"
          value={enteredText}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCloseModal} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button
              title="Add Goals"
              onPress={onAddGoalHandler}
              color={"#b180f0"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputConainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    width: "100%",
    borderRadius: 6,
    padding: 15,
    backgroundColor: "#e4d0ff",
    color: "#120468",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 110,
    margin: 20,
  },
});

export default GoalInput;
