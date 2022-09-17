import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import React, { useEffect, useMemo, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

interface GameScreenProps {
  userNumber: number;
  onGameOver: (numberOfGuess: number) => void;
}

enum Direction {
  lower,
  higher,
}
let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }: GameScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  const { width, height } = useWindowDimensions();

  const nextGuessHandler = (direction: Direction) => {
    if (
      (direction === Direction.lower && currentGuess < userNumber) ||
      (direction === Direction.higher && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "This is wrong...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === Direction.lower) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((previous) => [newRndNumber, ...previous]);
  };

  useEffect(() => {
    if (userNumber === currentGuess) {
      onGameOver(guessRounds.length);
    }
  }, [userNumber, currentGuess, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const guessRoundListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText
          title="Higher or Lower?"
          style={styles.instructionText}
        />
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, Direction.higher)}
          >
            <Ionicons name="md-add" size={15} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, Direction.lower)}>
            <Ionicons name="md-remove" size={15} color="white" />
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, Direction.higher)}
          >
            <Ionicons name="md-add" size={15} color="white" />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton onPress={nextGuessHandler.bind(this, Direction.lower)}>
            <Ionicons name="md-remove" size={15} color="white" />
          </PrimaryButton>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title title="Opponents Guess" />
      {content}
      <View
        style={[
          styles.guessListContainer,
          { paddingTop: height < 420 ? 1 : 10 },
        ]}
      >
        <FlatList
          data={guessRounds}
          renderItem={(data) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - data.index}
              guess={data.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
        {/* {guessRounds.map((guess: number) => {
          return <Text key={guess}>{guess}</Text>;
        })} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  guessStyle: {
    marginHorizontal: 2,
  },
  guessListContainer: {
    flex: 1,
    paddingTop: 10,
  },
});
export default GameScreen;
