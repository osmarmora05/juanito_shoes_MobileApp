import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";

// Librerías
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

// Componentes
import LoginScreenHeader from "../../components/LoginScreenHeader";
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import UserImage from "../../components/ui/buttons/UserImage";

// Constantes
import { theme } from "../../theme";
import { agregarUsuarioLocal, contieneEspacios, isEmail, showCustomToast } from "../../utils";
import { crearUsuario } from "../../controllers/usuarios.controller";
import { pb } from "../../lib/pocketbase";
import axios from "axios";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function RegisterAccount({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleImageSelected = (imagen) => {
    setUserImage(imagen);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    if (
      values.name === "" ||
      values.email === "" ||
      values.password === "" ||
      values.passwordConfirm === "" ||
      values.cedula === "" ||
      values.username === "" ||
      values.telefono === ""
    ) {
      showCustomToast("error", "Ups!", "Asegúrate de llenar los campos");
      setIsLoading(false);
      return;
    }

    for (const property in values) {
      if (values[property] == null || values[property].length == 0) {
        const unfilledField =
          property.charAt(0).toUpperCase() + property.slice(1);
        showCustomToast(
          "error",
          "Ups!",
          "Te falta llenar el campo " + unfilledField
        );
        setIsLoading(false);
        return;
      }
    }

    if (isEmail(values.email) == false) {
      showCustomToast(
        "info",
        "hey!",
        "Introduzca un correo electrónico válido"
      );
      setIsLoading(false);
      return;
    }

    if (contieneEspacios(values.username)) {
      showCustomToast(
        "info",
        "hey!",
        "Introduzca un username válido"
      );
      setIsLoading(false);
      return;
    }

    if (values.password !== values.passwordConfirm) {
      showCustomToast(
        "error",
        "Las contraseñas no coinciden",
        "Intentelo nuevamente"
      );
      setIsLoading(false);
      return;
    }

    // Validacion de la imagen
    if (!userImage) {
      showCustomToast("error", "Ups!", "Por favor selecciona una imagen");
      setIsLoading(false);
      return;
    }

    // Crea al usuario y mira si esta todo bien
    const registro = await crearUsuario(values, userImage);

    if (registro) {
      // Agrega al usuario en el registro de sesión y mantenerlo logeado al usuario creado
      agregarUsuarioLocal(registro);
      setTimeout(() => {
        navigation.navigate("HomeTab");
      }, 2000);
    } else{
      showCustomToast("error", "Error de registro de sesión!", "Intente con otro correo o username");
    }

    setIsLoading(false);
  };

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
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                name: "",
                cedula: "",
                telefono: "",
              }}
              onSubmit={handleFormSubmit}
            >
              {({ handleChange, values, handleSubmit }) => (
                <View style={styles.box}>
                  <View style={styles.fieldContainer}>
                    <View style={{ paddingTop: 10 }}>
                      <UserImage onImageSelected={handleImageSelected} />
                    </View>
                    <View>
                      <StyledText extraSmall>Nombre</StyledText>
                      <StyledTextInput
                        placeholder={"xxxxxxxx"}
                        value={values.name}
                        handleOnchange={handleChange("name")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Cedula</StyledText>
                      <StyledTextInput
                        placeholder={"xxxxxxxx"}
                        value={values.cedula}
                        handleOnchange={handleChange("cedula")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Telefono</StyledText>
                      <StyledTextInput
                        placeholder={"19002020"}
                        value={values.telefono}
                        handleOnchange={handleChange("telefono")}
                      />
                    </View>
                    <View>
                      <StyledText extraSmall>Nombre de usuario</StyledText>
                      <StyledTextInput
                        placeholder={"Juanito Stores"}
                        value={values.username}
                        handleOnchange={handleChange("username")}
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
                    <View>
                      <StyledText extraSmall>Contraseña</StyledText>
                      <StyledTextInput
                        placeholder={"Confirmar la contraseña"}
                        password
                        value={values.passwordConfirm}
                        handleOnchange={handleChange("passwordConfirm")}
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  container: {
    maxWidth: "90%",
    width: "100%",
    height: "100%",
    justifyContent: "start",
  },
  box: {
    justifyContent: "start",
    alignItems: "start",
    gap: 14,
  },
  fieldContainer: {
    justifyContent: "center",
    gap: 20,
  },
  buttonContainer: {
    paddingVertical: 15,
    gap: 10,
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
