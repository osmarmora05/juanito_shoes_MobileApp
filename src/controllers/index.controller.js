import { getImagen } from "./imagen.controller";
import {
  loginUsuario,
  actualizarUsuario,
  crearUsuario,
} from "./usuarios.controller";

import {getLimitedInventario, modificarInventario, getInventarioByOrder, getSpecificInventory } from "./inventario.controller";


import { agregarPedido, obtenerPedido } from "./pedidos.controller";

import {
  agregarMovimiento,
  obtenerMovimientos,
} from "./movimientos.controller";

export {
  getImagen,
  getLimitedInventario,
  getSpecificInventory,
  loginUsuario,
  actualizarUsuario,
  crearUsuario,
  agregarMovimiento,
  agregarPedido,
  obtenerPedido,
  obtenerMovimientos,
  getInventarioByOrder,
  modificarInventario
};
