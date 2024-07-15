import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "../screens/home/ProductDetails";
import ShoppingCart from "../screens/home/ShoppingCart";
import BottomTabNavigator from "./BottomTabNavigator";
import EditProfile from "../screens/home/EditProfile";
import Congratulations from "../screens/home/Congratulations";
import Search from "../screens/home/Search";
import OrderDetails from "../screens/home/OrderDetails";

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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "Editar perfil",
        }}
      />
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
