import { pb } from "../lib/pocketbase";

// async function getLimitedInventario(page = 1, perpPage = 6) {
//   const k = {};
//   try {
//     const result = await pb.collection("Modelos").getList(page, perpPage, {
//       filter: `estado = "Activo"`,
//       expand: "catalogo_id,catalogo_id.categoria_id,catalogo_id.marca_id"
//     });

//     if (
//       !result ||
//       result.items.length === 0 ||
//       typeof result.items === "undefined"
//     ) {
//       return null;
//     }

//     const promises = result.items.map(async (item) => {
//       const modeloId = item.id;

//       if (!k.hasOwnProperty(modeloId)) {
//         k[modeloId] = {
//           ...item,
//           variantes: [],
//         };
//       }

//       delete k[modeloId].cantidad;
//       delete k[modeloId].tallas;
//       delete k[modeloId].colores;
//       delete k[modeloId].imagenes;

//       const variantes = await pb.collection("Inventario").getFullList({
//         filter: `modelo_id = "${modeloId}"`,
//       });

//       variantes.forEach((variante) => {
//         const { id, cantidad, talla, color, imagen } = variante;

//         if (k[modeloId]) {
//           k[modeloId].variantes.push({
//             // ID del inventario
//             id: id,
//             cantidad: cantidad,
//             talla: talla,
//             color: color,
//             imagen: imagen,
//           });
//         }
//       });
//     });

//     await Promise.all(promises);

//     // Eliminar elementos que no tienen variantes
//     Object.keys(k).forEach((key) => {
//       if (k[key].variantes.length === 0) {
//         delete k[key];
//       }
//     });
//     console.log("Valor de k")
//     console.log(Object.values(k));
//     return Object.values(k)
//   } catch (e) {
//     console.log("there was an error in getLimitedInventario ", e);
//     throw e;
//   }
// }

// async function getLimitedInventario(page = 1, perpPage = 6) {
//   const k = {};
//   try {
//     const result = await pb.collection("Modelos").getList(page, perpPage, {
//       filter: `estado = "Activo"`,
//       expand: "catalogo_id,catalogo_id.categoria_id,catalogo_id.marca_id", // Expandir múltiples campos
//     });

//     // const result = await pb.collection("Modelos").getFullList({
//     //   filter: `estado = "Activo"`,
//     //   expand: "catalogo_id,catalogo_id.categoria_id,catalogo_id.marca_id", // Expandir múltiples campos
//     // })

//     if (
//       !result ||
//       result.items.length === 0 ||
//       typeof result.items === "undefined"
//     ) {
//       return null;
//     }

//     console.log(result);

//     const promises = result.items.map(async (item) => {
//       const modeloId = item.id;
//       const { expand, ...restoItem } = item;

//       const catalogo = expand ? expand.catalogo_id : {};
//       const categoria =
//         catalogo && catalogo.expand ? catalogo.expand.categoria_id : {};
//       const marca = catalogo && catalogo.expand ? catalogo.expand.marca_id : {};

//       if (!k.hasOwnProperty(modeloId)) {
//         k[modeloId] = {
//           ...restoItem,
//           ...catalogo,
//           ...categoria,
//           ...marca,
//           variantes: [],
//         };
//       }

//       delete k[modeloId].cantidad;
//       delete k[modeloId].tallas;
//       delete k[modeloId].colores;
//       delete k[modeloId].imagenes;
//       delete k[modeloId].expand;

//       const variantes = await pb.collection("Inventario").getFullList({
//         filter: `modelo_id = "${modeloId}"`,
//       });

//       variantes.forEach((variante) => {
//         const { id, cantidad, talla, color, imagen } = variante;

//         if (k[modeloId]) {
//           k[modeloId].variantes.push({
//             // ID del inventario
//             id: id,
//             cantidad: cantidad,
//             talla: talla,
//             color: color,
//             imagen: imagen,
//           });
//         }
//       });

//     });

//     await Promise.all(promises);

//     // Eliminar elementos que no tienen variantes
//     Object.keys(k).forEach((key) => {
//       if (k[key].variantes.length === 0) {
//         delete k[key];
//       }
//     });

//     console.log("Valor de k");
//     console.log(Object.values(k));
//     return Object.values(k);
//   } catch (e) {
//     console.log("there was an error in getLimitedInventario ", e);
//     throw e;
//   }
// }

async function getLimitedInventario(page = 1, perpPage = 8) {
  const k = {};
  try {
    const result = await pb.collection("Modelos").getList(page, perpPage, {
      filter: `estado = "Activo"`,
      expand: "catalogo_id,catalogo_id.categoria_id,catalogo_id.marca_id",
    });

    if (!result || result.items.length === 0 || typeof result.items === "undefined") {
      return null;
    }

    // console.log(result);

    const promises = result.items.map(async (item) => {
      const modeloId = item.id;
      const { expand, ...restoItem } = item;

      const catalogo = expand ? expand.catalogo_id : {};
      const categoria = catalogo && catalogo.expand ? catalogo.expand.categoria_id : {};
      const marca = catalogo && catalogo.expand ? catalogo.expand.marca_id : {};

      if (!k.hasOwnProperty(modeloId)) {
        k[modeloId] = {
          ...restoItem,
          ...catalogo,
          ...categoria,
          ...marca,
          variantes: [],
        };
      }

      delete k[modeloId].cantidad;
      delete k[modeloId].tallas;
      delete k[modeloId].colores;
      delete k[modeloId].imagenes;
      delete k[modeloId].expand;

      const variantes = await pb.collection("Inventario").getFullList({
        filter: `modelo_id = "${modeloId}"`,
      });

      const variantePromises = variantes.map(async (variante) => {
        const { id, cantidad, talla, color, imagen } = variante;
        const imageUrl = await getImageShoe(id);

        if (k[modeloId]) {
          k[modeloId].variantes.push({
            // ID del inventario
            id: id,
            cantidad: cantidad,
            talla: talla,
            color: color,
            imagen: imageUrl,
          });
        }
      });

      await Promise.all(variantePromises);
    });

    await Promise.all(promises);

    // Eliminar elementos que no tienen variantes
    Object.keys(k).forEach((key) => {
      if (k[key].variantes.length === 0) {
        delete k[key];
      }
    });

    // console.log("Valor de k");
    // console.log(Object.values(k));
    return Object.values(k);
  } catch (e) {
    console.log("There was an error in getLimitedInventario ", e);
    throw e;
  }
}

async function getImageShoe(id) {
  const record = await pb.collection("Inventario").getOne(`${id}`);
  const firstFilename = record.imagen;
  const url = pb.files.getUrl(record, firstFilename, { thumb: "100x250" });

  return url;
}

export { getLimitedInventario };
