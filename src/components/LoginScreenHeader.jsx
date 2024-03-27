import { View, Text, StyleSheet } from "react-native";
import StyledText from "./ui/StyledText";

export default function LoginScreenHeader({ title, description }) {
  return (
    <View style={styles.LoginScreenHeaderContainer}>
      <StyledText extraMedium bold textAlign="center">
        {title}
      </StyledText>
      <StyledText hint extraSmall textAlign="center">
        {description}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginScreenHeaderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});