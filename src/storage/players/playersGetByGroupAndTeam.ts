import { playersGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const groupPlayers = await playersGetByGroup(group);

    return groupPlayers.filter((player) => player.team === team);
  } catch (error) {
    throw error;
  }
}
