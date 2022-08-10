import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html,body,#root {
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
  }
`;
export default GlobalStyle;
