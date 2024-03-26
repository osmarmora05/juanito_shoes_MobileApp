import { Formik } from "formik";
import Toast from "react-native-toast-message";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import LoginScreenHeader from "../../components/LoginScreenHeader";
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import StyledPrimaryButton from "../../components/ui/StyledPrimaryButton";
import { showCustomToast } from "../../utils";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function SignIn() {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.container}>
            <LoginScreenHeader
              title={"¡Hola de nuevo!"}
              description={`Completa tus datos`}
            />
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                // console.log(values);

                if (values.email.length == 0 && values.password.length == 0) {
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
                showCustomToast("success", "Éxito", "Todo correcto");
              }}
            >
              {({ handleChange, values, handleSubmit, resetForm }) => (
                <View style={styles.box}>
                  <View style={styles.fieldContainer}>
                    <View>
                      <StyledText extraSmall>
                        Dirección de correo electrónico
                      </StyledText>
                      <StyledTextInput
                        placeholder="xyz@gmail.com"
                        value={values.email}
                        handleOnchange={handleChange("email")}
                        emailAddress
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Contraseña</StyledText>
                      <StyledTextInput
                        password
                        placeholder="Contraseña"
                        value={values.password}
                        handleOnchange={handleChange("password")}
                      />
                      <TouchableOpacity style={styles.touchablForgetPassword}>
                        <StyledText hint textAlign="right">
                          ¿Olvidaste tu contraseña?
                        </StyledText>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <StyledPrimaryButton
                      text={"Iniciar sesión"}
                      handleOnPress={handleSubmit}
                    />
                    <TouchableOpacity>
                      <StyledText medium textAlign="center">
                        ¿Nuevo Usuario? Crear una cuenta
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
  },
  mainView: {
    height: HEIGHT_WINDOW,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "90%",
    maxHeight: "70%",
    width: "100%",
    height: "100%",
    justifyContent: "start",
  },
  box: {
    height: "87.8%",
    justifyContent: "start",
    alignItems: "start",
  },

  fieldContainer: {
    height: "70%",
    justifyContent: "center",
    gap: 30,
  },

  touchablForgetPassword: {
    marginTop: 10,
  },

  buttonContainer: {
    height: "30%",
    justifyContent: "space-between",
  },
});
