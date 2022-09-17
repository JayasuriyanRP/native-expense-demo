import { FC } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

// const deviceInfo = Dimensions.get("window");

interface GameOverScreenProps {
  onRestart: () => void;
  userNumber: number;
  numberOfTries: number;
}

const GameOverScreen: FC<GameOverScreenProps> = ({
  onRestart,
  userNumber,
  numberOfTries,
}) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 420) {
    imageSize = 150;
  }
  if (height < 420) {
    imageSize = 80;
  }

  const imageStyle: ViewStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView
      style={styles.rootContainer}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Title title="GAME OVER" />
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{numberOfTries}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlightText}>{userNumber}</Text>.
        </Text>
      </View>
      <PrimaryButton onPress={onRestart}>Start new Game</PrimaryButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    // borderRadius: deviceInfo.width < 380 ? 75 : 150,
    // width: deviceInfo.width < 380 ? 150 : 300,
    // height: deviceInfo.width < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary700,
  },
});

export default GameOverScreen;
