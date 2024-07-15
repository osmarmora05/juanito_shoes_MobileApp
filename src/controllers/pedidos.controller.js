import { pb } from "../lib/pocketbase";

export async function agregarPedido({
  user_id = "",
  total = 0,
  sub_total = 0,
}) {
  const consulta = {
    user_id: user_id,
    total: total,
    sub_total: sub_total,
    estado: "Activo",
  };
  const record = await pb.collection("Pedidos").create(consulta);
  return record;
}

export async function obtenerPedido({ user_id }) {
  try {
    const record = await pb
      .collection("Pedidos")
      .getFullList({}, { filter: `user_id = "${user_id}"` });
    return record;
  } catch (error) {
    console.log(error);
  }
}
