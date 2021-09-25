import styled from "styled-components";
import { useThemeContext } from "common/context/Theme"

export const Header = () => {

  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  function handleChangeTheme() {
    if(isDarkTheme) {
      setIsDarkTheme(false);
      localStorage.setItem('theme', false);
    }
    if(!isDarkTheme) {
      setIsDarkTheme(true);
      localStorage.setItem('theme', true);
    }
  }

  return (
    <HeaderStyled>
      <strong>FastMarket</strong>
      <button onClick={handleChangeTheme}>dark | light</button>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 50px;
  background: ${props => props.theme.background};
  margin-bottom: 20px;

  strong {
    color: ${props => props.theme.text};
  }
`