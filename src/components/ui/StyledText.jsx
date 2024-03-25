import { Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

export default function StyledText({
  hint,
  light,
  bold,
  extraBold,
  black,
  small,
  medium,
  big,
  children,
  ...restOfProps
}) {
  const styles = StyleSheet.create({
    text: {
      fontFamily: light
        ? theme.font.fonts.light
        : bold
        ? theme.font.fonts.bold
        : extraBold
        ? theme.font.fonts.extraBold
        : black
        ? theme.font.fonts.black
        : theme.font.fonts.regular,
      fontSize: small
        ? theme.font.small.fontSize
        : medium
        ? theme.font.medium.fontSize
        : big
        ? theme.font.big.fontSize
        : theme.font.normal.fontSize,
      color: hint ? theme.colors.text.hint : theme.colors.text.default,
    },
  });
  return (
    <Text style={styles.text} {...restOfProps}>
      {children}
    </Text>
  );
}