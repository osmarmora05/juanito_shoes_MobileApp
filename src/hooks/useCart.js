import { useContext } from "react";
import { CartContext } from "../context/cart";

/*
  `useCart`: Custom hook que permite utilizar el contexto `CartContext`
*/

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used withing a CartContextProvider");
  }
  return context;
};