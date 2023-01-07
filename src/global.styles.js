import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    padding: 20px 70px;

    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }

  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;