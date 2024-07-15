import { createContext, useContext, useEffect, useState } from "react";
import { cargarUsuarioLocal } from "../localStorage/usuario.local";
import { obtenerPedido } from "../controllers/pedidos.controller";
import {
  obtenerMovimientos,
  getInventarioByOrder,
} from "../controllers/index.controller";
import { UserContext } from "./user";
import { useUser } from "../hooks/useUser";

/* 
    'OrderContext' Contexto para traer los detalles de cada pedido

    - Se necesita del id del pedido, usuario, inventario y movimiento

    Pasos:
    1. se consulta al usuario
    2. se consulta los pedidos del usuario
    3. Si el usuario desea ver los detalles del producto, se consulta los movimientos del pedido
    4. Se consulta el inventario del pedido para mostrar los detalles del producto
    5. Se retorna el contexto
*/

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useUser();

  const [pedidos, setPedidos] = useState([]);
  const [movimientoPedido, setMovimientoPedido] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPedidos = async () => {
    if (user) {
      try {
        const pedidosObtenidos = await obtenerPedido({ user_id: user.id });
        setPedidos(pedidosObtenidos);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const fetchInventarios = async () => {
    try {
      const promises = movimientoPedido.map((movimiento) =>
        getInventarioByOrder({
          modelo_id: movimiento.modelo_id,
          color: movimiento.color,
          talla: movimiento.talla,
        })
      );
      setLoading(false);
      const inventariosResult = await Promise.all(promises);
      setInventarios(inventariosResult);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  const fetchMovimientos = async ({ id }) => {
    try {
      setLoading(true);
      const movimientos = await obtenerMovimientos({ pedido_id: id });
      setMovimientoPedido(movimientos);
    } catch (error) {
      console.error("Error fetching movements:", error);
    }
  };

  useEffect(() => {
    getPedidos();
  }, [user]);

  useEffect(() => {
    if (movimientoPedido.length > 0) {
      fetchInventarios();
    }
  }, [movimientoPedido]);

  return (
    <OrderContext.Provider
      value={{
        movimientoPedido,
        inventarios,
        pedidos,
        fetchMovimientos,
        loading,
        getPedidos
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
