import Toast from "react-native-toast-message";
import { theme } from "./theme";

export function showCustomToast(
  type,
  text1,
  text2,
  position = "top",
  visibilityTime = 4000
) {
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
    position: position,
    visibilityTime: visibilityTime,
  });
}

export function isEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}
