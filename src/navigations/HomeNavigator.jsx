import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/home/ProductDetails";
import ShoppingCart from "../screens/home/ShoppingCart";
import Home from "../screens/home/Home";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
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