import { pb } from '../lib/pocketbase'
import { showCustomToast } from '../utils';
import axios from 'axios';

// globally disable auto cancellation
pb.autoCancellation(false);

async function loginUsuario(email, password) {
  try {
    const authData = await pb.collection('Usuarios').authWithPassword(`${email}`, `${password}`);
    return authData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function crearUsuario(data, image) {

  try {
    // Comprueba si hay un usuario con el mismo correo o nombre de usuario
    const usuario = await existeUsuario(data.email, data.username);
    if (usuario) {
      return false;
    } else {
      // Crear un form data para ingresar los datos de la tabla usuario
      const formData = new FormData();

      // Agregar en formData los datos de la tabla de Usuarios
      formData.append('username', data.username)
      formData.append('nombre', data.name)
      formData.append('cedula', data.cedula)
      formData.append('telefono', data.telefono)
      formData.append('rol_id', "4o7lb2h8vtv940f") // Id del cliente
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('passwordConfirm', data.passwordConfirm)
      formData.append('emailVisibility', true) 

      // Agregar la foto del usuario
      formData.append("foto", {
        uri: image.assets[0].uri,
        type: image.assets[0].mimeType,
        name: `${data.username}.jpg`,
      });

      try {
        const response = await axios.post("https://juanito-web-app.pockethost.io/api/collections/Usuarios/records", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;

      } catch (error) {
        console.error("Error al de registro:", error);
      }


    }


  } catch (error) {
    console.log("crearUsuario: ", error);
    return false;
  }
}

async function existeUsuario(email, username) {
  try {
    // Busca si hay un usuario con el mismo correo o nombre de usuario
    const user = await pb.collection("Usuarios").getFullList(
      {},
      {
        filter: `email = "${email}" || username = "${username}"`,
      }
    );

    // Booleano que valida si el usuario existe o no
    return user.length != 0 ? true : false;
  } catch (error) {
    console.log("existeUsuario: ", error);
  }
}

// Función para actualizar el registro en PocketBase
async function actualizarUsuario(data, image, recordId) {

  const info = {
    username: data.username,
    emailVisibility: true,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    oldPassword: data.oldPassword,
    nombre: data.name,
    cedula: data.cedula,
    telefono: data.telefono,
    rol_id: "4o7lb2h8vtv940f"
    };
  console.log(info)

  // const formData = new FormData();
  // formData.append('username', data.username);
  // formData.append('nombre', data.name);
  // formData.append('cedula', data.cedula);
  // formData.append('telefono', data.telefono);
  // formData.append('rol', "4o7lb2h8vtv940f"); // Id del cliente
  // formData.append('email', data.email);
  // formData.append('password', data.password);
  // formData.append('passwordConfirm', data.passwordConfirm);
  // formData.append('oldPassword', data.passwordConfirm);
  // Agregar la foto del usuario

  // formData.append("foto", {
  //   uri: image.uri,
  // });
  // console.log(formData)

  try {
    const record = await pb.collection('Usuarios').update(recordId, info);
    return record;

  } catch (error) {
    console.error("Error al actualizar el registro:", error);
  }
}

export {
  loginUsuario,
  crearUsuario,
  actualizarUsuario,
};