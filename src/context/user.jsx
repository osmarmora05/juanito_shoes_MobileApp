// import { createContext, useState } from "react";
// import { cargarUsuarioLocal } from "../localStorage/usuario.local";

// /* 
//     '
// */

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const agregarUsuario = async (usuario) => {
//     try {
//       setUser(usuario);
//       setUser(usuario);
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   const obtenerUsuario = async () => {
//     try {
//       const usuarioCargado = await cargarUsuarioLocal();
//       setUser(usuarioCargado);
//     } catch (error) {
//       console.error("Error loading user:", error);
//     }
//   };

//   const eliminarUsuario = () => {
//     setUser(null);
//   }

//   return (
//     <UserProvider.Provider value={{ user, obtenerUsuario, eliminarUsuario, agregarUsuario }}>
//       {children}
//     </UserProvider.Provider>
//   );
// }
