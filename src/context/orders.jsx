import { createContext, useEffect, useState } from "react";
import { obtenerPedido } from "../controllers/pedidos.controller";
import {
  obtenerMovimientos,
  getInventarioByOrder,
} from "../controllers/index.controller";
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
  // Se obtiene el usuario del contexto
  const { user } = useUser();

  // Se inicializan los estados

  // pedidos: se almacenan los pedidos del usuario
  const [pedidos, setPedidos] = useState([]);

  // movimientoPedido: se almacenan los movimientos segun el pedido del usuario
  const [movimientoPedido, setMovimientoPedido] = useState([]);

  // inventarios: se almacenan los inventarios segun el pedido del usuario
  const [inventarios, setInventarios] = useState([]);

  // loading: se utiliza para mostrar un loader mientras se cargan los datos
  const [loading, setLoading] = useState(false);

  // 'getPedidos' Función para obtener todos los pedidos del usuario
  const getPedidos = async () => {
    // Se hace una validación si el usuario existe en el contexto
    if (user) {
      try {
        // Se obtienen los pedidos del usuario y se almacenan en el estado 'pedidos'
        const pedidosObtenidos = await obtenerPedido({ user_id: user.id });
        setPedidos(pedidosObtenidos);
      } catch (error) {
        console.error("Error GetPedidos:", error);
      }
    }
  };

  /* 
    'fetchInventarios' Función para obtener los inventarios segun el pedido del usuario
    Se hace una petición al pocketbase por cada movimiento del pedido
  */
  const fetchInventarios = async () => {
    try {
      /*
        Se obtienen los inventarios segun el pedido del usuario, para ello se hace una petición al pocketbase 
        por cada movimiento del pedido y hacer un promise.all para obtener todos los inventarios
      */
      const promises = movimientoPedido.map((movimiento) =>
        getInventarioByOrder({
          modelo_id: movimiento.modelo_id,
          color: movimiento.color,
          talla: movimiento.talla,
        })
      );
      setLoading(false);
      // Despues de obtener todos los inventarios se almacenan en el estado 'inventarios'
      const inventariosResult = await Promise.all(promises);
      setInventarios(inventariosResult);
    } catch (error) {
      console.error("Error fetchInventarios:", error);
    }
  };

  /* 
    'fetchMovimientos' Función para obtener los movimientos segun el pedido del usuario
  */
  const fetchMovimientos = async ({ id }) => {
    try {
      setLoading(true);
      console.log()
      console.log("fetchMovimientos", id);
      console.log()
      const movimientos = await obtenerMovimientos({ pedido_id: id });
      setMovimientoPedido(movimientos);
    } catch (error) {
      console.error("Error fetchMovimientos:", error);
    }
  };

  // Este useEffect se ejecuta cada vez que el usuario cambia de estado en el contexto
  useEffect(() => {
    getPedidos();
  }, [user]);

  // Este useEffect se ejecuta cada vez que el usuario quiere ver el detalle de un pedido
  useEffect(() => {
    fetchInventarios();
  }, [movimientoPedido]);

  return (
    <OrderContext.Provider
      value={{
        movimientoPedido,
        inventarios,
        pedidos,
        fetchMovimientos,
        loading,
        getPedidos,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
