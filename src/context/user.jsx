// src/context/userContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const agregarUsuario = (usuario) => {
    try {
      setUser(usuario);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const eliminarUsuario = () => {
    setUser([]);
  };

  return (
    <UserContext.Provider value={{ user, eliminarUsuario, agregarUsuario }}>
      {children}
    </UserContext.Provider>
  );
}
