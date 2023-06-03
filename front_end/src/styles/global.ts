import { createGlobalStyle } from 'styled-components';

   export const GlobalStyles = createGlobalStyle`
   *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: none;
      list-style: none;
      text-decoration: none;
   }

   :root {
   --grey-0: #F8F9FA;
   --grey-100: #868E96;
   --grey-200: #343B41;
   --grey-300: #212529;
   --grey-400: #121214;
   
}

   button{
      cursor: pointer;
   }

   dialog{
      display: unset;
      position: unset;
   }

   body{
      background-color:#e0e0e0  ;
   }
   `;
