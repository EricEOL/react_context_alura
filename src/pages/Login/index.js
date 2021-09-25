import { ThemeProvider } from 'styled-components';
import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { UserContext } from 'common/context/User';
import { useContext } from 'react';
import { darkTheme, lightTheme } from 'themes';
import { useThemeContext } from 'common/context/Theme';

function Login() {

  const history = useHistory();
  const { name, setName, balance, setBalance } = useContext(UserContext);
  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  function handleChangeTheme() {
    if(isDarkTheme) setIsDarkTheme(false);
    if(!isDarkTheme) setIsDarkTheme(true);
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Titulo>Insira o seu nome</Titulo>
        <InputContainer>
          <InputLabel>
            Nome
          </InputLabel>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>
            Saldo
          </InputLabel>
          <Input
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            type="number"
            startAdornment={
              <InputAdornment position="start">
                R$
              </InputAdornment>
            }
          />
        </InputContainer>
        <Button
          variant="contained"
          color="primary"
          disabled={name.length < 2}
          onClick={() => history.push('/feira')}
        >
          Avançar
        </Button>
        <button onClick={handleChangeTheme}>DARK | LIGHT</button>
      </Container>
    </ThemeProvider>
  )
};

export default Login;