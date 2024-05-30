import { pb } from "../lib/pocketbase";

function getImagen({ collectionId, id, imagen }) {
  return `https://juanito-web-app.pockethost.io/api/files/${collectionId}/${id}/${imagen}`;
}

export { getImagen };