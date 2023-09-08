import AsyncStorage from '@react-native-async-storage/async-storage';
import { groupGetAll } from './groupGetAll';
import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroupName: string) {
  try {
    const groupStorage = await groupGetAll();

    if (groupStorage.includes(newGroupName)) {
      throw new AppError('A group with this name already exists.');
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...groupStorage, newGroupName])
    );
  } catch (error) {
    throw error;
  }
}
