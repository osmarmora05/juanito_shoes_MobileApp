import PocketBase from 'pocketbase';
import { EXPO_PB_URL } from '@env';

const pb = new PocketBase(`${EXPO_PB_URL}`);

function getImagen({ collectionId, id, imagen }) {
  return `https://juanito-web-app.pockethost.io/api/files/${collectionId}/${id}/${imagen}`;
}

export { getImagen, pb };