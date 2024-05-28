import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/home/ProductDetails";
import ShoppingCart from "../screens/home/ShoppingCart";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          headerTitle: "Carrito de compras",
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTitle: "Detalles del zapato",
        }}
      />
    </Stack.Navigator>
  );
}