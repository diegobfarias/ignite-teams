import { Container, Content, Icon } from './styles';
import { groupCreate } from '@storage/group/groupCreate';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleCreateNewGroup() {
    try {
      await groupCreate(group);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='New team'
          subtitle='Create a new team to add new people to it.'
        />
        <Input placeholder="Team's name" onChangeText={setGroup} />
        <Button
          title='Create'
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  );
}
