import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
  flex: 1;
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  justify-content: center;
  flex-direction: row;
  border-radius: 6px;
  width: 100%;
`;

export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  margin: 32px 0 12px;
`;

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.GRAY_200};
  `};
  margin-top: 6px;
`;
