import styled from "styled-components";
import { useThemeContext } from "common/context/Theme"

export const Header = () => {

  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  function handleChangeTheme() {
    if (isDarkTheme === 'dark') {
      setIsDarkTheme('light');
      localStorage.setItem('theme', 'light');
    }
    if (isDarkTheme === 'light') {
      setIsDarkTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <HeaderStyled>
      <strong>FastMarket</strong>
      <ContainerButton>
        <Button onClick={handleChangeTheme}>dark | light</Button>
      </ContainerButton>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  width: 100vw;
  height: 50px;
  background: ${props => props.theme.background};
  margin-bottom: 20px;

  strong {
    color: ${props => props.theme.text};
  }
`

const ContainerButton = styled.div`
`

const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 50px;
  border: none;
  font-size: 14px;

  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  filter: invert(100%);

  cursor: pointer;
`