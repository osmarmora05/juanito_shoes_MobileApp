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
  extraMedium,
  extraSmall,
  children,
  textAlign = "auto",
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
        : extraMedium
        ? theme.font.extraMedium.fontSize
        : extraSmall
        ? theme.font.extraSmall.fontSize
        : theme.font.normal.fontSize,
      color: hint ? theme.colors.text.hint : theme.colors.text.default,
      textAlign: textAlign,
    },
  });
  return (
    <Text style={styles.text} {...restOfProps}>
      {children}
    </Text>
  );
}
