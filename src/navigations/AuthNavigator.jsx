import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterAccount from "../screens/login/RegisterAccount";
import SignIn from "../screens/login/SignIn";
import ForgotPassword from "../screens/login/ForgotPassword";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterAccount"
          component={RegisterAccount}
          options={{
            headerTitle: "Registro de Cuenta",
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: "Has olvidado tu contraseña",
          }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
