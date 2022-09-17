import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

interface StartGameScreenProps {
  onPickNumber: (number: number) => void;
}

const StartGameScreen = ({ onPickNumber }: StartGameScreenProps) => {
  const [enteredNumber, setEnteredNumber] = useState<string>("");

  const numberInputHandler = (enteredText: string) => {
    setEnteredNumber(enteredText);
  };

  const confirmHandler = () => {
    const number = parseInt(enteredNumber);

    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Invalid Input!", "Value should be between 1 - 99", [
        { text: "okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    onPickNumber(number);

    console.log("Valid Number");
  };

  const resetHandler = () => {
    setEnteredNumber("");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={styles.rootContainer}>
          <Title title="Guess my Number" />
          <Card>
            <InstructionText title="Enter Number" />
            <TextInput
              style={styles.textinput}
              maxLength={2}
              keyboardType={"number-pad"}
              autoCapitalize="none"
              value={enteredNumber}
              autoCorrect={false}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
              <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  textinput: {
    height: 45,
    width: 50,
    fontSize: 28,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default StartGameScreen;
