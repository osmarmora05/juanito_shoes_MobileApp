import { theme } from "./theme";

// Librerias
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

export function contieneEspacios(text) {
  // Expresión regular para buscar espacios en blanco
  const regex = /\s/;
  // Devuelve true si la variable contiene al menos un espacio en blanco
  console.log(regex.test(text))
  return regex.test(text);
}

export async function agregarUsuarioLocal(usuario) {
  try {
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario))
  } catch (error) {
    console.log("Error agregar al usuario en AsyncStorage: ", error)
  }
}

export async function cargarUsuarioLocal() {
  try {
    const usuario = await AsyncStorage.getItem('usuario')
    return usuario != null ? JSON.parse(usuario) : null;
  }
  catch (error) {
    console.log("Error cargar al usuario en AsyncStorage: ", error)
    return
  }
}

export async function eliminarUsuarioLocal() {
  try {
    await AsyncStorage.removeItem("usuario");
  } catch (error) {
    console.log("Error eliminar al usuario en AsyncStorage: ", error)
    return
  }
}

export function validarCampos(values, userImage){
  // Se utiliza para validar a los usuario en registrar usuario y Editar perfil de usuario
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
    return false;
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
      
      return false;
    }
  }

  if (isEmail(values.email) == false) {
    showCustomToast(
      "info",
      "hey!",
      "Introduzca un correo electrónico válido"
    );
    
    return false;
  }

  if (contieneEspacios(values.username)) {
    showCustomToast(
      "info",
      "hey!",
      "Introduzca un username válido"
    );
    
    return false;
  }

  if (values.password.length < 8) {
    showCustomToast(
      "error",
      "Contraseña inválida",
      "Debe tener más de 8 caracteres"
    );
    
    return false;
    ;
  }

  if (values.password !== values.passwordConfirm) {
    showCustomToast(
      "error",
      "Las contraseñas no coinciden",
      "Intentelo nuevamente"
    );
    
    return false;
    ;
  }

  if (!userImage) {
    showCustomToast("error", "Ups!", "Por favor selecciona una imagen");
    
    return false;
  }

  return true;
}
