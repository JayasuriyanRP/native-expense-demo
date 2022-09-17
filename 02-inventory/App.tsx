import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import ProductScreenStack from "./screens/Product/ProductScreenStack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text>This is Jayasuriyan's profile</Text>
    </SafeAreaView>
  );
};

export default function App() {
  const focusedColor = (isFocused: boolean) =>
    isFocused ? "#FFFFFF" : "#C2C2C2";

  const tabBarStyle = (isFocused: boolean) => {
    return {
      size: 20,
      color: focusedColor(isFocused),
    };
  };

  const tabScreenLabel = (isFocused: boolean, title: string) => {
    return isFocused && <Text style={{ color: "#FFFFFF" }}>{title}</Text>;
  };

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 15,
              color: "#000000",
            },
            tabBarStyle: {
              backgroundColor: "#060606",
              height: 45,
            },
            headerStyle: {
              backgroundColor: "#DDDDDD",
            },
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Home"
            component={ProductScreenStack}
            options={{
              headerShown: false,
              tabBarIcon: (tabInfo: any) => (
                <Ionicons name="md-home" {...tabBarStyle(tabInfo.focused)} />
              ),
              tabBarLabel: (tabInfo: any) =>
                tabScreenLabel(tabInfo.focused, "Home"),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: (tabInfo: any) => (
                <Ionicons name="person" {...tabBarStyle(tabInfo.focused)} />
              ),
              tabBarLabel: (tabInfo: any) =>
                tabScreenLabel(tabInfo.focused, "Profile"),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
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
