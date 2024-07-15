import { useContext } from "react";
import { UserContext } from "../context/user";

/* 
    
*/
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
