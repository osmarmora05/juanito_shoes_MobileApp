import AsyncStorage from "@react-native-async-storage/async-storage";

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