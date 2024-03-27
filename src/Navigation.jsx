import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterAccount from "./screens/login/RegisterAccount";
import SignIn from "./screens/login/SignIn";
import ForgotPassword from "./screens/login/ForgotPassword";

const Stack = createStackNavigator();

export default function Navigation() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
