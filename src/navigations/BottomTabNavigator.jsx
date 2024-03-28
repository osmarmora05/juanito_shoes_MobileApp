import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home/Home";
import HomeIcon from "../../assets/icons/navigation/home.svg";
import History from "../screens/home/History";
import HistoryIcon from "../../assets/icons/navigation/history.svg";
import Profile from "../screens/home/Profile";
import ProfileIcon from "../../assets/icons/navigation/user.svg";
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

          if (route.name === "HomeTab") {
            iconComponent = <HomeIcon stroke={"#000"} />;
          } else if (route.name === "History") {
            iconComponent = <HistoryIcon stroke={"#000"} />;
          } else if (route.name === "Profile") {
            iconComponent = <ProfileIcon stroke={"#000"} />;
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
        name="HomeTab"
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