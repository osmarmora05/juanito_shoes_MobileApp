import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";

// Librerías
import { Formik } from "formik";
import Toast from "react-native-toast-message";

// Componentes
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";

// Constantes
import { theme } from "../../theme";
import { showCustomToast, validarCampos } from "../../utils";
import {
  actualizarUsuario,
  getImagen,
  loginUsuario,
} from "../../controllers/index.controller";
import {
  agregarUsuarioLocal,
  cargarUsuarioLocal,
} from "../../localStorage/index.local";
import { useUser } from "../../hooks/useUser";

export default function EditProfile({ navigation }) {
  const { user, agregarUsuario } = useUser();

  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        setUserImage(getImagen(user.collectionId, user.id, user.foto));
        setCargandoDatos(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    obtenerUsuario();
  }, []);

  const handleImageSelected = (imagen) => {
    setUserImage(imagen);
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    console.log("values", values);

    const credentials = await loginUsuario(values.email, values.oldPassword);

    // Valida si el usuario esta correcto y si no, regresa el mensaje de error
    if (!credentials) {
      setIsLoading(false);
      showCustomToast(
        "error",
        "Error al editar el perfil",
        "El correo y la contraseña anterior no son correctos.",
        "top",
        3000
      );
      return;
    }

    // Validar si los campos son correctos
    if (validarCampos(values, userImage)) {
      const registro = await actualizarUsuario(values, userImage, user.id);

      if (registro) {
        // Actualiza el usuario en el contexto y en el AsyncStorage
        await agregarUsuarioLocal(registro);
        agregarUsuario(registro);

        setIsLoading(false);
        showCustomToast(
          "success",
          "Edito el perfil con exitoso",
          "Gracias por contar con nosotros!"
        );
        setTimeout(() => {
          navigation.navigate("Home");
        }, 2000);
      } else {
        showCustomToast(
          "error",
          "Error de registro de sesión!",
          "Intente con otro correo o username"
        );
      }
    }
    setIsLoading(false);
  };

  if (!cargandoDatos) {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.container}>
              <Formik
                initialValues={{
                  username: user.username,
                  email: user.email,
                  password: user.password,
                  passwordConfirm: user.passwordConfirm,
                  oldPassword: user.oldPassword,
                  name: user.nombre,
                  cedula: user.cedula,
                  telefono: user.telefono,
                }}
                onSubmit={handleFormSubmit}
              >
                {({ handleChange, values, handleSubmit }) => (
                  <View style={styles.box}>
                    <View style={styles.fieldContainer}>
                      <View style={{ paddingTop: 10, alignItems: "center" }}>
                        {/* <UserImage
                          onImageSelected={handleImageSelected}
                          photo={userImage}
                        /> */}
                        <View style={styles.container_img}>
                          <Image style={styles.icon} src={`${userImage}`} />
                        </View>
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
                          editable={false}
                        />
                      </View>
                      <View>
                        <StyledText extraSmall>Contraseña anterior</StyledText>
                        <StyledTextInput
                          placeholder={"Confirmar la contraseña"}
                          password
                          value={values.oldPassword}
                          handleOnchange={handleChange("oldPassword")}
                        />
                      </View>
                      <View>
                        <StyledText extraSmall>Nueva contraseña</StyledText>
                        <StyledTextInput
                          placeholder={"Contraseña"}
                          password
                          value={values.password}
                          handleOnchange={handleChange("password")}
                        />
                      </View>
                      <View>
                        <StyledText extraSmall>Confirmar contraseña</StyledText>
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
                        text={"Actualizar"}
                        handleOnPress={handleSubmit}
                      />
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
    alignItems: "center",
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
  containerName: {
    alignItems: "center",
    justifyContent: "center",
  },
  container_img: {
    borderRadius: 75,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
  },
  icon: {
    width: 150,
    height: 150,
  },
});
