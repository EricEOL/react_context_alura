import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background: ${props => props.theme.background};
  @media(min-width: 768px) {
    margin: 0 auto;
    width: 60%;
  }
`;

export const Titulo = styled.h2`
  margin-bottom: 20px;
  margin-top: 50px;
  color: ${props => props.theme.text};
`;

export const InputContainer = styled(FormControl)`
  margin-bottom: 30px;
`