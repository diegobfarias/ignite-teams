import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { groupGetAll } from './groupGetAll';

export async function groupCreate(newGroupName: string) {
  try {
    const groupStorage = await groupGetAll();

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...groupStorage, newGroupName])
    );
  } catch (error) {
    throw error;
  }
}
