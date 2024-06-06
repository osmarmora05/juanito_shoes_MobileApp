import PocketBase from 'pocketbase';
import { EXPO_PB_URL } from '@env';

const pb = new PocketBase(EXPO_PB_URL);

export { pb };