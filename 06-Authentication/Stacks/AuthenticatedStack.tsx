import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constants/styles";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useContext } from "react";
import { AuthActionType, AuthContext } from "../store/AuthContext";

const Stack = createNativeStackNavigator();

export const AuthenticatedStack = () => {
  const context = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                iconName={"exit"}
                color={tintColor ?? ""}
                size={24}
                onPress={() => {
                  context.dispatch({
                    type: AuthActionType.Logout,
                    payload: undefined,
                  });
                }}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;

export type AuthenticatedStackParamList = {
  Welcome: any;
};
