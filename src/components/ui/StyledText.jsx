import { Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

// TODO: use props

export default function StyledText({
  hint,
  textDefault,
  textLight,
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
  uppercase,
  textAlign = "auto",
  numberOfLines = 0,
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
      color: hint
        ? theme.colors.text.hint
        : textDefault
        ? theme.colors.text.default
        : textLight
        ? theme.colors.text.defaultLight
        : theme.colors.text.default,
      textAlign: textAlign,
      textTransform: uppercase ? "uppercase" : "none",
    },
  });
  return (
    <Text style={styles.text} {...restOfProps} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
