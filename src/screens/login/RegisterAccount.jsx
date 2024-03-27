import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LoginScreenHeader from "../../components/LoginScreenHeader";
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import { Formik } from "formik";
import StyledPrimaryButton from "../../components/ui/StyledPrimaryButton";
import { theme } from "../../theme";
import { isEmail, showCustomToast } from "../../utils";
import Toast from "react-native-toast-message";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function RegisterAccount({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.container}>
            <LoginScreenHeader
              title={"Registrar Cuenta"}
              description={"Completa tus datos"}
            />
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                if (
                  values.name.length == 0 &&
                  values.email.length == 0 &&
                  values.password.length == 0
                ) {
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
                    if (property == "name") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Nombre"
                      );

                      return;
                    } else if (property == "email") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Correo"
                      );
                      return;
                    } else if (property == "password") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Contraseña"
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
                      <StyledText extraSmall>Su nombre</StyledText>
                      <StyledTextInput
                        placeholder={"xxxxxxxx"}
                        value={values.name}
                        handleOnchange={handleChange("name")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>
                        Dirección de correo electrónico
                      </StyledText>
                      <StyledTextInput
                        placeholder={"xyz@gmail.com"}
                        emailAddress
                        value={values.email}
                        handleOnchange={handleChange("email")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Contraseña</StyledText>
                      <StyledTextInput
                        placeholder={"Contraseña"}
                        password
                        value={values.password}
                        handleOnchange={handleChange("password")}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <StyledPrimaryButton
                      text={"Inscribirse"}
                      handleOnPress={handleSubmit}
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignIn")}
                    >
                      <StyledText medium textAlign="center">
                        ¿Ya tienes cuenta? Acceso
                      </StyledText>
                    </TouchableOpacity>
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
    height: "62%",
    justifyContent: "center",
    gap: 30,
  },

  buttonContainer: {
    height: "25%",
    justifyContent: "space-between",
  },
});
