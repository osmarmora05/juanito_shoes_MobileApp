import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  Modal,
} from "react-native";

// Componentes
import StyledText from "../../components/ui/StyledText";
import StyledTextInput from "../../components/ui/StyledTextInput";
import StyledLogoutButton from "../../components/ui/buttons/StyledLogoutButton";

// Constantes
import { theme } from "../../theme";
import {
  showCustomToast,
} from "../../utils";

import {
  cargarUsuarioLocal,
  eliminarUsuarioLocal,
} from "../../localStorage/index.local";

import { getImagen } from "../../controllers/index.controller";
import Toast from "react-native-toast-message";

export default function Profile({ navigation }) {
  const [userImage, setUserImage] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cargarDatos, setCargarDatos] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioLocal = await cargarUsuarioLocal();
        if (usuarioLocal) {
          setUsuario(usuarioLocal);
          setUserImage(getImagen(usuarioLocal.collectionId, usuarioLocal.id, usuarioLocal.foto));
          setCargarDatos(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    obtenerUsuario();
  }, [usuario]);

  if (!cargarDatos) {
    return (
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={{ gap: 20 }}>
          <View style={styles.container}>
            <View style={styles.container_img}>
              <Image style={styles.icon} src={`${userImage}`} />
            </View>
            <StyledText textAlign="center" medium>
              {usuario.username}
            </StyledText>
            <TouchableOpacity
              style={styles.changeLabel}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text style={{ color: "#0D6EFD" }}>
                Cambiar información del perfil
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View>
              <StyledText extraSmall>Nombre</StyledText>
              <StyledTextInput editable={false} value={usuario.nombre} />
            </View>
            <View>
              <StyledText extraSmall>Cedula</StyledText>
              <StyledTextInput editable={false} value={usuario.cedula} />
            </View>
            <View>
              <StyledText extraSmall>Telefono</StyledText>
              <StyledTextInput editable={false} value={usuario.telefono} />
            </View>
            <View>
              <StyledText extraSmall>
                Dirección de correo electrónico
              </StyledText>
              <StyledTextInput
                editable={false}
                emailAddress
                value={usuario.email}
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
                  setIsLoading(false);
                  setTimeout(() => {
                    navigation.navigate("SignIn");
                  }, 1000);
                }}
              />
            </View>
          </View>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  form: {
    gap: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
