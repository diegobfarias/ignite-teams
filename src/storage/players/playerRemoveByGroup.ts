import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerRemoveByGroup(playerName: string, groupName: string) {
  try {
    const players = await playersGetByGroup(groupName);
    const filteredPlayers = players.filter((player) => player.name !== playerName);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify(filteredPlayers)
    );
  } catch (error) {
    throw error;
  }
}
