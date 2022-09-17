import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const deviceInfo = Dimensions.get("window");

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [isFontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const { width, height } = useWindowDimensions();

  console.log(isFontLoaded);

  if (!isFontLoaded) {
    return <></>;
  }

  const pickedNumberHandler = (number: number) => {
    setUserNumber(number);
  };

  const handleGameOver = (numberOfGuess: number) => {
    setGuessRounds(numberOfGuess);
    setGameOver(true);
  };

  const handleGameRestart = () => {
    setUserNumber(0);
    setGuessRounds(0);
    setGameOver(false);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    console.log(userNumber);
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }
  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        onRestart={handleGameRestart}
        userNumber={userNumber}
        numberOfTries={guessRounds}
      />
    );
  }

  const marginTop = height < 420 ? 30 : 100;

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        style={[styles.container]}
        colors={[Colors.primary700, Colors.accent500]}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.container}
          imageStyle={styles.imageStyle}
        >
          <SafeAreaView
            style={[styles.safeAreaContainer, { marginTop: marginTop }]}
          >
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    marginTop: deviceInfo.height < 380 ? 30 : 100,
    padding: 15,
  },
  imageStyle: {
    opacity: 0.15,
  },
});
