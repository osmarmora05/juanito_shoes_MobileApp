import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";

// Librerias
import Toast from "react-native-toast-message";
import { Formik } from "formik";

// Funciones
import { isEmail, showCustomToast } from "../../utils";

import {
  agregarUsuarioLocal,
  cargarUsuarioLocal,
} from "../../localStorage/index.local";

import { theme } from "../../theme";

// Componentes
import StyledGoogleButton from "../../components/ui/buttons/StyledGoogleButton";
import LoginScreenHeader from "../../components/LoginScreenHeader";
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";

// Controladores
import { loginUsuario } from "../../controllers/index.controller";
import { useUser } from "../../hooks/useUser";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function SignIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { agregarUsuario } = useUser()


  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const usuario = await cargarUsuarioLocal();
      agregarUsuario(usuario)
      if (usuario) {
        // eliminarUsuarioLocal() Probando la funcion xD
        setIsLoading(false);
        navigation.navigate("HomeTab");
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

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
              onSubmit={async (values, actions) => {
                setIsLoading(true);

                if (values.email.length == 0 && values.password.length == 0) {
                  showCustomToast(
                    "error",
                    "Ups!",
                    "Por fi, asegúrate de llenar los campos"
                  );
                  setIsLoading(false);
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
                      setIsLoading(false);

                      return;
                    } else if (property == "password") {
                      showCustomToast(
                        "error",
                        "Ups!",
                        "Ups! Olvidastes llenar el campo Contraseña"
                      );
                      setIsLoading(false);
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
                      setIsLoading(false);

                      return;
                    }
                  }
                }

                // Validar si es un correo
                if (isEmail(values.email) == false) {
                  showCustomToast(
                    "info",
                    "hey!",
                    "Introduzca un correo electrónico válido"
                  );
                  setIsLoading(false);

                  return;
                }

                // Busca en pb al usuario digitado
                const existeUsuario = await loginUsuario(
                  values.email,
                  values.password
                );

                if (existeUsuario) {
                  setIsLoading(false);
                  showCustomToast(
                    "success",
                    "Inicio de sesión exitoso",
                    "Bienvenido a Juanito store!"
                  );

                  // Se agrega al local storage
                  agregarUsuarioLocal(existeUsuario.record);
                  
                  // Se agrega al contexto
                  agregarUsuario(existeUsuario.record)
                  // const usuario = await cargarUsuarioLocal()
                  // eliminarUsuarioLocal()

                  setTimeout(() => {
                    navigation.navigate("HomeTab");
                  }, 1000);
                } else {
                  setIsLoading(false);
                  showCustomToast(
                    "error",
                    "Error de inicio de sesión",
                    "El correo y contraseña no son correctos.",
                    "top",
                    3000
                  );
                }
              }}
            >
              {({ handleChange, values, handleSubmit, resetForm }) => (
                <View style={styles.box}>
                  <View style={styles.fieldContainer}>
                    {/* Header */}
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
                    {/* Main */}
                    <View>
                      <StyledText extraSmall>Contraseña</StyledText>
                      <StyledTextInput
                        password
                        placeholder="Contraseña"
                        value={values.password}
                        handleOnchange={handleChange("password")}
                      />
                      <TouchableOpacity
                        style={styles.touchablForgetPassword}
                        onPress={() => navigation.navigate("ForgotPassword")}
                      >
                        <StyledText hint textAlign="right">
                          ¿Olvidaste tu contraseña?
                        </StyledText>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* Footer */}
                  <View style={styles.buttonContainer}>
                    <View style={styles.innerButtonContainer}>
                      <StyledPrimaryButton
                        text={"Iniciar sesión"}
                        handleOnPress={handleSubmit}
                      />
                      <StyledGoogleButton
                        handleOnPress={async () => {
                          console.log("holi");
                          // const authData = await pb.collection('Usuarios').authWithOAuth2({ provider: 'google' });
                          // console.log(authData);
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("RegisterAccount")}
                    >
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
      <Modal
        transparent={true}
        animationType="none"
        visible={isLoading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        </View>
      </Modal>
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

  innerButtonContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 18,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
