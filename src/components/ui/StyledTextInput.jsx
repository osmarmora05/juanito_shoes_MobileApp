import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Eye from "../../../assets/icons/eye/eye.svg";
import EyeOff from "../../../assets/icons/eye/eye-off.svg";
import { theme } from "../../theme";

export default function StyledTextInput({
  emailAddress,
  phone,
  password,
  placeholder,
  name,
  value,
  handleOnchange,
}) {
  if (
    (emailAddress && phone) ||
    (emailAddress && password) ||
    (phone && password)
  ) {
    throw new Error(
      "hey! in StyledTextInput Only one type of input is allowed :V"
    );
  }
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textInput: {
      maxWidth: 800,
      width: "100%",
      height: 48,
      borderRadius: 14,
      paddingLeft: 16,
      paddingRight: password ? 45 : 16,
      backgroundColor: theme.colors.bg.defaultDark,
    },
    icon: {
      position: "absolute",
      right: 20,
      width: 24,
      height: 24,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        secureTextEntry={password ? !showPassword : undefined}
        keyboardType={
          emailAddress ? "email-address" : phone ? "phone-pad" : "default"
        }
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnchange}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
        {password && (
          <TouchableOpacity onPress={toggleShowPassword}>
            {showPassword ? (
              <EyeOff stroke={theme.colors.text.hint} styles={styles.icon} />
            ) : (
              <Eye stroke={theme.colors.text.hint} styles={styles.icon} />
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}