import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupGetAll() {
  try {
    const groups = await AsyncStorage.getItem(GROUP_COLLECTION);
    return groups ? JSON.parse(groups) : [];
  } catch (error) {
    throw error;
  }
}
