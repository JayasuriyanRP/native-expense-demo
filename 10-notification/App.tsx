import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import * as Notification from "expo-notifications";
import { useEffect } from "react";

Notification.setNotificationHandler({
  handleNotification: async (notification) => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

export async function allowsNotificationsAsync() {
  const settings = await Notification.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notification.IosAuthorizationStatus.PROVISIONAL
  );
}

export default function App() {
  useEffect(() => {
    async function setupPushNotification() {
      const { status } = await Notification.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notification.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Push notification needed permission"
        );
        return;
      }

      const tokenData = await Notification.getExpoPushTokenAsync();
      console.log(tokenData);

      if (Platform.OS === "android") {
        Notification.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notification.AndroidImportance.DEFAULT,
        });
      }
    }

    setupPushNotification();
  }, []);
  useEffect(() => {
    const subscription = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log(notification.request.content.data);
      }
    );

    const subscription1 = Notification.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      subscription.remove();
      subscription1.remove();
    };
  }, []);

  async function scheduleNotificationHandler() {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { userName: "Max" },
      },
      trigger: { seconds: 5 },
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
