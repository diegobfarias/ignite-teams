import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDto } from './dto/PlayerStorage.dto';

export async function playersGetByGroup(group: string) {
  try {
    const groupPlayersStorage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
    const players: PlayerStorageDto[] = groupPlayersStorage ? JSON.parse(groupPlayersStorage) : [];

    return players;
  } catch (error) {
    throw error;
  }
}
