import { pb } from '../data/Pocketbase'
import Toast from 'react-native-toast-message';

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

export {
  loginUsuario,
};