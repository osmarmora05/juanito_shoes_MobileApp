import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";

import { eliminarUsuarioLocal, showCustomToast } from "../../utils";
import { theme } from "../../theme";

// Librerias
import { Formik } from "formik";

// Componentes
import StyledTextInput from "../../components/ui/StyledTextInput"; // assuming this is the correct import
import StyledText from "../../components/ui/StyledText";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import StyledLogoutButton from "../../components/ui/buttons/StyledLogoutButton";

export default function Profile({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/img/avatar.png")}
          />
          <Text style={styles.name}>Francisco Melendez</Text>
          <Text style={styles.changePhoto}>Cambiar foto de perfil</Text>
        </View>

        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirm: "",
            oldPassword: "",
            nombre: "",
            cedula: "",
            telefono: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <StyledText extraSmall>Nombre</StyledText>
                <StyledTextInput
                  placeholder="Juanito shoes"
                  value={values.nombre}
                  onChangeText={handleChange("nombre")}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Cedula</StyledText>
                <StyledTextInput
                  placeholder="123456789"
                  value={values.cedula}
                  onChangeText={handleChange("cedula")}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Telefono</StyledText>
                <StyledTextInput
                  placeholder="19002020"
                  value={values.telefono}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Correo electrónico</StyledText>
                <StyledTextInput
                  placeholder="xyz@gmail.com"
                  value={values.email}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Contraseña</StyledText>
                <StyledTextInput
                  placeholder="Contraseña"
                  value={values.password}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Confirmar contraseña</StyledText>
                <StyledTextInput
                  placeholder="Confirmar contraseña"
                  value={values.passwordConfirm}
                />
              </View>

              <View style={styles.inputContainer}>
                <StyledText extraSmall>Contraseña anterior</StyledText>
                <StyledTextInput
                  placeholder="Contraseña anterior"
                  value={values.oldPassword}
                />
              </View>

              <View style={styles.buttonContainer}>
                <StyledPrimaryButton
                  text={"Guardar cambios"}
                  handleOnPress={handleSubmit}
                />
              </View>
              <View>
                <StyledLogoutButton
                  text={"Cerrar sesion"}
                  handleOnPress={async () => {
                    setIsLoading(true);
                    await eliminarUsuarioLocal();
                    showCustomToast(
                      "success",
                      "Cerrar sesión completado!",
                      "Gracias por ingresar a Juanito store!"
                    );

                    setTimeout(() => {
                      setIsLoading(false);
                      navigation.navigate("SignIn");
                    }, 1000);
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    borderRadius: 50,
    width: 96,
    height: 96,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },
  changePhoto: {
    color: "blue",
    marginTop: 5,
    fontSize: 12,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
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
