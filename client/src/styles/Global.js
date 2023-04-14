import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.backgroundColor};

    ::-webkit-scrollbar {
      width: 5px;
    }


    ::-webkit-scrollbar-track {
      background: transparent;
    }


    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }


    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;
