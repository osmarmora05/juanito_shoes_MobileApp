import { useContext } from "react";
import { UserContext } from "../context/user";

/* 
    'useOrderDetails' Custom Hook para el control de usuarios en toda la aplicación.
*/
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
