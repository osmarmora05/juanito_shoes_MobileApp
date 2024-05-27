import PocketBase from 'pocketbase';

const pb = new PocketBase('https://juanito-web-app.pockethost.io');

function getImagen({collectionId, id, imagen}) {
  return `https://juanito-web-app.pockethost.io/api/files/${collectionId}/${id}/${imagen}`;
}

export {getImagen, pb};