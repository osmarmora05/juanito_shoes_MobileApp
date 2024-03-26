import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { theme } from "../../theme";

export default function StyledPrimaryButton({ text, handleOnPress, icon }) {
  return (
    <TouchableHighlight onPress={handleOnPress} style={styles.parent}>
      <View style={styles.container}>
        {icon && <View>{icon}</View>}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  parent: {
    borderRadius: 13,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg.primary,
    borderRadius: 13,
    height: 50,
    width: "100%",
    gap: 10,
  },
  text: {
    color: theme.colors.text.defaultLight,
    fontFamily: theme.font.fonts.extraBold,
  },
});
