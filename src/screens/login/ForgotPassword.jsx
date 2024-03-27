import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import LoginScreenHeader from "../../components/LoginScreenHeader";
import { Formik } from "formik";
import StyledPrimaryButton from "../../components/ui/StyledPrimaryButton";
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import { theme } from "../../theme";
import { isEmail, showCustomToast } from "../../utils";
import Toast from "react-native-toast-message";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function ForgotPassword() {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.container}>
            <LoginScreenHeader
              title={"Has olvidado tu contraseña"}
              description={
                "Ingrese su cuenta de correo electrónico para enviar el codigo de verificacion"
              }
            />
            <Formik
              initialValues={{
                email: "",
                code: "",
              }}
              onSubmit={(values) => {
                if (values.email.length == 0 && values.code.length == 0) {
                  showCustomToast(
                    "error",
                    "Ups!",
                    "Por fi, asegúrate de llenar los campos"
                  );
                  return;
                }

                for (const property in values) {
                  if (
                    values[property] == null ||
                    values[property].length == 0
                  ) {
                    if (property == "email") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Correo"
                      );

                      return;
                    } else if (property == "code") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Codigo"
                      );
                      return;
                    } else {
                      const unfilledField =
                        property.charAt(0).toUpperCase() + property.slice(1);
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Se te paso por alto llenar el campo " +
                          unfilledField
                      );
                      return;
                    }
                  }
                }

                if (isEmail(values.email) == false) {
                  showCustomToast(
                    "info",
                    "hey!",
                    "Introduzca un correo electrónico válido"
                  );
                  return;
                }

                showCustomToast("success", "Éxito", "Todo correcto");
              }}
            >
              {({ handleChange, values, handleSubmit }) => (
                <View style={styles.box}>
                  <View style={styles.fieldContainer}>
                    <View>
                      <StyledText extraSmall>
                        Dirección de correo electrónico
                      </StyledText>
                      <StyledTextInput
                        placeholder={"xyz@gmail.com"}
                        value={values.email}
                        handleOnchange={handleChange("email")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Codigo</StyledText>
                      <StyledTextInput
                        placeholder={"xxxxxxxx"}
                        value={values.code}
                        handleOnchange={handleChange("code")}
                        emailAddress
                      />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <StyledPrimaryButton
                      text={"Verificar codigo"}
                      handleOnPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.bg.default,
  },
  mainView: {
    height: HEIGHT_WINDOW - 56,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "90%",
    maxHeight: "84%",
    width: "100%",
    height: "100%",
    justifyContent: "start",
  },
  box: {
    height: "87.8%",
    justifyContent: "start",
    alignItems: "start",
    gap: 14,
  },
  fieldContainer: {
    height: "50%",
    justifyContent: "center",
    gap: 30,
  },

  buttonContainer: {
    height: "29%",
    justifyContent: "space-between",
  },
});