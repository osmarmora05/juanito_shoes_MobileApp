import Toast from "react-native-toast-message";
import { theme } from "./theme";

export function showCustomToast(type, text1, text2) {
  Toast.show({
    type: type, // success, error, info
    text1: text1,
    text2: text2,
    text1Style: {
      fontSize: theme.font.medium.fontSize,
    },
    text2Style: {
      fontSize: theme.font.extraSmall.fontSize,
    },
  });
}