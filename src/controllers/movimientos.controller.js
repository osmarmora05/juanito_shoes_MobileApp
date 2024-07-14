import { pb } from "../lib/pocketbase";

export async function agregarMovimiento({
  data = {},
  user_id = "",
  pedido_id = "",
}) {
  const consulta = {
    "cantidad": data.cantidad_compra,
    "talla": data.talla,
    "color": data.color,
    "modelo_id": data.id_modelo,
    "user_id": user_id,
    "tipo_movimiento": "hrlcut3ih6uibj2",
    "pedido_id": pedido_id,
  };
  const record = await pb.collection("Movimientos").create(consulta);
//   console.log("record", record);
//   return record;
}

export async function obtenerMovimientos({ pedido_id }) {
  try {
    const record = await pb
      .collection("Movimientos")
      .getFullList({}, { filter: `pedido_id = "${pedido_id}"` });
    return record
  } catch (error) {
    console.log(error);
  }
}
