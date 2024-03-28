import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { theme } from "./src/theme";
import Constants from "expo-constants";
import AuthNavigator from "./src/navigations/AuthNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    [theme.font.fonts.light.toString()]: require("./assets/fonts/Poppins-Light.ttf"),
    [theme.font.fonts.regular.toString()]: require("./assets/fonts/Poppins-Regular.ttf"),
    [theme.font.fonts.bold.toString()]: require("./assets/fonts/Poppins-Bold.ttf"),
    [theme.font.fonts.extraBold.toString()]: require("./assets/fonts/Poppins-SemiBold.ttf"),
    [theme.font.fonts.black.toString()]: require("./assets/fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <AuthNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bg.default,
  },
});