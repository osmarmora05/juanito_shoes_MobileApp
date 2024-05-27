import { pb } from '../data/Pocketbase'
import Toast from 'react-native-toast-message';

// globally disable auto cancellation
pb.autoCancellation(false);

async function loginUsuario(email, password) {
  try {
    console.log(email)
    console.log(password)
    const authData = await pb.collection('Usuarios').authWithPassword(`${email}`, `${password}`);
    console.log(pb.authStore.isValid);
    return authData;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// async function crearUsuario(data) {
//   try {
//     // Tabla de usuarios en pocketbase
//     const datos = {
//       username: data.username,
//       email: data.email,
//       emailVisibility: true,
//       password: data.password,
//       passwordConfirm: data.passwordConfirm,
//       nombre: data.nombre,
//       rol: data.rol,
//       cedula: data.cedula,
//       telefono: data.telefono
//     };

//     // Comprueba si hay un usuario con el mismo correo o nombre de usuario
//     const user = await existeUsuario(datos.email, datos.username);

//     // la varible "user" es un arreglo con los usuarios que coinciden con el correo o nombre de usuario
//     if (user.length === 1) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error de registro de sesión',
//         text2: 'Usuario ya existe, intente con otro correo o nombre de usuario',
//         position: 'top',
//       });
//     } else {
//       // Crea el usuario, porque no existe
//       console.log('Creando usuario...');
//       await pb.collection('Usuarios').create(datos);
//       Toast.show({
//         type: 'success',
//         text1: 'Usuario creado exitosamente',
//         text2: 'Se ha creado con exito al usuario, Bienvenido ' + datos.username,
//         position: 'top',
//       });
//     }

//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function existeUsuario(email, username) {
//   try {
//     // Busca si hay un usuario con el mismo correo o nombre de usuario
//     const user = await pb.collection('Usuarios').getFullList(
//       {},
//       {
//         filter: `email = "${email}" || username = "${username}" || id = "${id}"`,
//       },
//     );

//     // Devuelve un arreglo con los usuarios que coinciden con el correo o nombre de usuario
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function buscarInfoUsuario(id) {
//   try {
//     const user = await pb
//       .collection('users')
//       .getFullList({ filter: `id = "${id}"` });
//     console.log(user);
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function editarUsuario(id, data) {
//   try {
//     await pb.collection('users').update(`${id}`, data);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// async function registroUsuario(id) {
//   try {
//     // Busca si hay un usuario con el mismo correo o nombre de usuario
//     const user = await pb.collection('users').getFullList(
//       {},
//       {
//         filter: `id = "${id}"`,
//       },
//     );

//     // Devuelve un arreglo con los usuarios que coinciden con el correo o nombre de usuario
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }

export {
  loginUsuario,
};