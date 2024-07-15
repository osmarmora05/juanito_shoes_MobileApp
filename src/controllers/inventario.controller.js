import { pb } from "../lib/pocketbase";

/*
  Este archivo almacena todos aquellas funciones que interectuan con la tabla inventario (Aunque puede
  haber el caso que se implique otras tablas)
*/

/*
  `getLimitedInventario`: Permitira obtener los zapatos en existencias de la tabla inventario (mas omenos)

  1. Recibe por parametro el `page` que representa una lista paginada, y el `perpPage` representa los items de la lista paginada, en el que por defecto devolvemos los primeros 8
  2. Hacemos una consulta a la tabla "Modelos", Por que a esta tabla?, por que cada fila es unica, es decir que no habran zapatos repetidos a comparado con la tabla inventario que si pueden haber zapatos repetidos con distintos colores, tallas, etc, esto nos simplifica muuchas las cosas para obtener las existencia, por ejemplo:

    Si nos traemos los primeros 8 registro de la tabla "Modelos" (que cada fila representa un zapato) y luego cuando carge la app pintamos los anteriores registros en cards. Pero ahora imaginate que el usuario va haciendo scroll
    para ver mas zapatos que hay en el catalogo, entonces nos traemos de la siguiente lista paginada otro 8 registro más, sin la preocupacion que se nos dupliquen las zapatos (ya que sabemos que no habran zapatos repetidos) y así sucesivamente, que encontraste de la tabla "Inventarios" si nos podemos encontrar zapatos pintados en la ui con distinta fecha de ingreso, otros colores, tallas, etc, entonces de alguna manera tendriamos que saber cuales cards fueron pintadas para irlas actualizando con los nuevo datos cosa que es mas chamba. Habra unm momento que sera nulo los items de la lista paginada(no habran registros) entonces se le notifica al usuario que no hay data

    Postata: Me se explicar como el cerote, pero hago el mejor esfuerzo :v
  
  3. Del registro obtenidos de la tabla "Modelos" recorremos cada uno de ello
     y obtenemos el `modelo_id` y hacemos una consulta a la tabla "Inventario" 
     que coincida con el `modelo_id`, asi obtenemos todas la variantes que puede tener un zapato, y este proceso lo aplicamos a cada registro que retorna la tabla "Modelos"
  4. Ahora que tenemos todas las variantes que puede tener un zapato, creamos
     objetos que contenga informacion relevante del zapato como nombre, categoria, imagen, existencias, etc ...
  5. Por ultimo dentro el objeto `k` crearemos arreglo , y cada uno de estos    
     arreglo, tendra multiples objetos con atributos que nos interesa(imagen, id, etc), cada arreglo representa un zapato, y cada item, figura las variantes que puede tener un zapato

*/
async function getLimitedInventario(page = 1, perpPage = 8) {
  // Objeto aux que almacena los zapatos en existencias (puede tener multiples zapatos, por defectos son 8 si hay claro...)
  const k = {};
  // Consulta a la tabla modelos
  try {
    const modelos = await pb.collection("Modelos").getList(page, perpPage, {
      filter: `estado = "Activo"`,
    });

    // Validamos que la consulta devuelva alguna valor
    if (
      !modelos ||
      modelos.items.length === 0 ||
      typeof modelos.items === "undefined"
    ) {
      return null;
    }

    // Recorremos cada registro que retorne la consulta que se hace a la tabla Modelos
    // Para luego obtener su id, y hacer un consulta a la tabla inventario filrando por aquellos registro que coincida con el id de la tabla modelos

    const promises = modelos.items.map(async (item) => {
      // Obtenmos el id de la tabla Modelos
      const modeloId = item.id;
      const inventario = await pb.collection("Inventario").getFullList({
        filter: `modelo_id = "${modeloId}"`,
        // Hacemos un expand de las llaves foráneas, para así poder acceder
        // a columnas interesante de esa tabla
        expand:
          "modelo_id.catalogo_id.marca_id,modelo_id.catalogo_id.categoria_id",
      });

      // Chequeamos que si hay algun registro de la tabla Inventario que coindicia cone el modelo_id

      if (inventario.length > 0) {
        const inventarioItems = await Promise.all(
          // Obtenemos informacion relevante de la tabla inventario
          inventario.map(async (invItem) => ({
            id_inventario: invItem.id,
            cantidad: invItem.cantidad,
            // Obtenemos imagen de cada registro
            imagen: await getImageShoe(invItem.id),
            talla: invItem.talla,
            color: invItem.color,
            id_modelo: invItem.expand.modelo_id.id,
            modelo: invItem.expand.modelo_id.modelo,
            precio: invItem.expand.modelo_id.precio,
            // Habran tablas que esten relacionadas a multiples tablas como en este caso, que el modelo_id es una llave foranea de la tabla Inventario, para poder acceder por ejemplo a la descripcion que tiene un zapato, tendremos que acceder a la tabla modelos primeramente, para poder hace eso desde la tabla inventario, hacemos un expand de la llave foranea modelo_id, luego podemos acceder a la tabla modelos, que esta relacionada a la tabla catalogo que atravez de su llave foranea catalogo_id, podemos acceder a la descripcion que esta en la tabla catalogo
            descripcion:
              invItem.expand.modelo_id.expand.catalogo_id.descripcion,
            nombre: invItem.expand.modelo_id.expand.catalogo_id.nombre,
            nombre_categoria:
              invItem.expand.modelo_id.expand.catalogo_id.expand.categoria_id
                .nombre_categoria,
            nombre_marca:
              invItem.expand.modelo_id.expand.catalogo_id.expand.marca_id
                .nombre_marca,
          }))
        );

        // Agregamos el objeto creado inventarioItems en el objeto K
        k[modeloId] = inventarioItems;
      }
    });

    // Esperamos todas las promesas
    await Promise.all(promises);
    return Object.values(k);
  } catch (e) {
    console.log("There was an error in getLimitedInventario ", e);
    throw e;
  }
}

/*
  `getImageShoe`: Permite obtener la imagen del zapato de la tabla inventario
*/
async function getImageShoe(id) {
  const record = await pb.collection("Inventario").getOne(`${id}`);
  const firstFilename = record.imagen;
  const url = pb.files.getUrl(record, firstFilename, { thumb: "100x250" });

  return url;
}

/*
  'getInventario': Permite obtener el inventario de un zapato mediante el id 
*/

async function getInventarioById(id) {
  const record = await pb.collection("Inventario").getOne(id);
  return record;
}

/* 
  'ModificarInventario': Permite modificar el inventario de cada zapato (Esto se hace cuando el usuario realiza una compra, 
  se le resta la cantidad de zapatos que compro al inventario de la tabla inventario)
*/

async function modificarInventario(cart) {
  const { id, cantidad, color, modelo_id, talla } = await getInventarioById(
    cart.id_inventario
  );
  // console.log("Data", { id, cantidad, color, modelo_id, talla });

  const consulta = {
    cantidad: cantidad - cart.cantidad_compra,
    talla: talla,
    color: color,
    modelo_id: modelo_id,
    // inventario_id: id,
  };

  const record = await pb.collection("Inventario").update(id, consulta);
  console.log("record", record);
}

/* 
  'getSpecificInventory': Retorna la existencia de un zapato en especifico
*/

async function getSpecificInventory(shoeName) {
  try {
    // Objeto aux que almacena los zapatos en existencias
    const k = {};
    const catalogo = await pb.collection("Catalogo").getFullList({
      filter: `nombre ~ "${shoeName}"`,
    });

    // Validamos que la consulta devuelva alguna valor

    if (!catalogo || catalogo.length === 0) {
      return null;
    }

    const promises = catalogo.map(async (item) => {
      const catalogoId = item.id;

      const modelos = await pb.collection("Modelos").getFullList({
        filter: `estado = "Activo" && catalogo_id = "${catalogoId}"`,
      });

      // Validamos que la consulta devuelva alguna valor
      if (!modelos || modelos.length === 0) {
        return null;
      }
      const modeloId = modelos[0].id;

      const inventario = await pb.collection("Inventario").getFullList({
        filter: `modelo_id = "${modeloId}"`,
        // Hacemos un expand de las llaves foráneas, para así poder acceder
        // a columnas interesante de esa tabla
        expand:
          "modelo_id.catalogo_id.marca_id,modelo_id.catalogo_id.categoria_id",
      });

      if (inventario.length > 0) {
        const inventarioItems = await Promise.all(
          // Obtenemos informacion relevante de la tabla inventario
          inventario.map(async (invItem) => ({
            id_inventario: invItem.id,
            cantidad: invItem.cantidad,
            // Obtenemos imagen de cada registro
            imagen: await getImageShoe(invItem.id),
            talla: invItem.talla,
            color: invItem.color,
            id_modelo: invItem.expand.modelo_id.id,
            modelo: invItem.expand.modelo_id.modelo,
            precio: invItem.expand.modelo_id.precio,
            // Habran tablas que esten relacionadas a multiples tablas como en este caso, que el modelo_id es una llave foranea de la tabla Inventario, para poder acceder por ejemplo a la descripcion que tiene un zapato, tendremos que acceder a la tabla modelos primeramente, para poder hace eso desde la tabla inventario, hacemos un expand de la llave foranea modelo_id, luego podemos acceder a la tabla modelos, que esta relacionada a la tabla catalogo que atravez de su llave foranea catalogo_id, podemos acceder a la descripcion que esta en la tabla catalogo
            descripcion:
              invItem.expand.modelo_id.expand.catalogo_id.descripcion,
            nombre: invItem.expand.modelo_id.expand.catalogo_id.nombre,
            nombre_categoria:
              invItem.expand.modelo_id.expand.catalogo_id.expand.categoria_id
                .nombre_categoria,
            nombre_marca:
              invItem.expand.modelo_id.expand.catalogo_id.expand.marca_id
                .nombre_marca,
          }))
        );

        // Agregamos el objeto creado inventarioItems en el objeto K
        k[modeloId] = inventarioItems;
      }
    });

    await Promise.all(promises);
    return Object.values(k);
  } catch (e) {
    console.log("There was an error in getSpecificInventory ", e);
    throw e;
  }
}
/*
 'getInventarioByOrder': Permite obtener el inventario de un zapato mediante el modelo_id, color y talla.
 Esto me servira para saber los detalles de un zapato en especifico de un pedido
*/
async function getInventarioByOrder({ modelo_id, color, talla }) {
  const record = await pb.collection("Inventario").getFullList({
    filter: `modelo_id = "${modelo_id}" && color = "${color}" && talla = "${talla}"`, expand:'modelo_id.catalogo_id'
  });
  return record[0]
}

export { getLimitedInventario, modificarInventario, getInventarioByOrder, getSpecificInventory };
