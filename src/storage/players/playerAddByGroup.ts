import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDto } from './dto/PlayerStorage.dto';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerAddByGroup(newPlayer: PlayerStorageDto, group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerExists = storedPlayers.filter((player) => player.name === newPlayer.name);

    if (playerExists.length) {
      throw new AppError(`Player ${newPlayer.name} already exists in a team in this group.`);
    }

    const playersStorage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playersStorage);
  } catch (error) {
    throw error;
  }
}
