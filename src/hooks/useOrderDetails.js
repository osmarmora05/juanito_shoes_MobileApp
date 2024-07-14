import { useContext } from "react";
import { OrderContext } from "../context/orders";

/* 
    'useOrderDetails' Custom Hook para traer los detalles de cada pedido.
    Se necesita del id del pedido
*/
export const useOrderDetails = () => {
  const context = useContext(OrderContext);
  return context
  };