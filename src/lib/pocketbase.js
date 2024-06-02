import PocketBase from 'pocketbase';
import { EXPO_PB_URL } from '@env';

const pb = new PocketBase("https://juanito-web-app.pockethost.io");

export { pb };