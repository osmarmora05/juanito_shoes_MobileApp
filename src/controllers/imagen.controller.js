import { pb } from "../lib/pocketbase";

function getImagen({ collectionId, id, foto }) {
  return `https://juanito-web-app.pockethost.io/api/files/${collectionId}/${id}/${foto}`;
}

export { getImagen };