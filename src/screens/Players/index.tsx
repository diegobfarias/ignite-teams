import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Alert, FlatList, TextInput } from 'react-native';

import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupDeleteByName } from '@storage/group/groupDeleteByName';
import { PlayerStorageDto } from '@storage/players/dto/PlayerStorage.dto';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';

import { AppError } from '@utils/AppError';

import { PlayerCard } from '@components/PlayerCard';
import { ButtonIcon } from '@components/ButtonIcon';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDto[]>([]);

  const newPlayerNameRef = useRef<TextInput>(null);

  const navigator = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Oh no!',
        "Something went wrong. It's was not possible to fetch players by team."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddNewPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Error', 'You need to inform a player name.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameRef.current?.blur();

      setNewPlayerName('');

      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Ops!', error.message);
      } else {
        console.error(error);
        return Alert.alert(
          'Oh no!',
          "Something went wrong. It's was not possible to add a new player."
        );
      }
    }
  }

  async function removePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.error(error);
      return Alert.alert('Error', 'It was not possible to remove this player.');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    Alert.alert('Remove player', `Are you sure you want to remove ${playerName}?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => removePlayer(playerName),
      },
    ]);
  }

  async function groupDelete() {
    try {
      await groupDeleteByName(group);
      navigator.navigate('groups');
    } catch (error) {
      console.error(error);
      return Alert.alert('Error', 'It was not possible to delete this group.');
    }
  }

  async function handleDeleteGroup() {
    Alert.alert('Delete', 'Are you sure you want to delete this group?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => groupDelete(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle='Add players to each team!' />

      <Form>
        <Input
          inputRef={newPlayerNameRef}
          autoCorrect={false}
          value={newPlayerName}
          placeholder='Persons name'
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType='send'
        />
        <ButtonIcon icon='add' onPress={handleAddNewPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={['Team A', 'Team B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
          )}
          ListEmptyComponent={() => <ListEmpty message='There is no one on this team.' />}
        />
      )}

      <Button title={`Delete Group`} type='SECONDARY' onPress={handleDeleteGroup} />
    </Container>
  );
}
