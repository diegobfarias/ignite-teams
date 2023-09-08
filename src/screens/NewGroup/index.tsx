import { Container, Content, Icon } from './styles';
import { groupCreate } from '@storage/group/groupCreate';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleCreateNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Error', 'You need to inform a group name.');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Ops!', error.message);
      } else {
        return Alert.alert(
          'Oh no!',
          "Something went wrong. It's was not possible to create a new group."
        );
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight title='New team' subtitle='Create a new team to add new people to it.' />
        <Input
          placeholder="Team's name"
          onChangeText={setGroup}
          onSubmitEditing={handleCreateNewGroup}
          returnKeyType='send'
        />
        <Button title='Create' style={{ marginTop: 20 }} onPress={handleCreateNewGroup} />
      </Content>
    </Container>
  );
}
