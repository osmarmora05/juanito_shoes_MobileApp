import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import HomeIconFilled from "../../assets/icons/navigation/home_filled.svg";
import HomeIconOutline from '../../assets/icons/navigation/home_outline.svg'
import History from "../screens/home/History";
import HistoryIconFilled from "../../assets/icons/navigation/history_filled.svg";
import HistoryIconOutline from "../../assets/icons/navigation/history_outline.svg";
import Profile from "../screens/home/Profile";
import ProfileIconFilled from "../../assets/icons/navigation/user_filled.svg";
import ProfileIconOutline from "../../assets/icons/navigation/user_outline.svg";
import { View, StyleSheet } from "react-native";
import { theme } from "../theme";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.bg.defaultDark,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused, size }) => {
          let iconComponent;

          if (route.name === "Home") {
            iconComponent = focused ? (
              <HomeIconFilled />
            ) : (
              <HomeIconOutline />
            );
          } else if (route.name === "History") {
            iconComponent = focused ? (<HistoryIconFilled />) : (<HistoryIconOutline />)
          } else if (route.name === "Profile") {
            iconComponent = focused ? (<ProfileIconFilled />) : (<ProfileIconOutline />)
          }

          return (
            <View
              style={[
                styles.icon,
                { backgroundColor: focused ? color : "transparent" },
              ]}
            >
              {iconComponent}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});