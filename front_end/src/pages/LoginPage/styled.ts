import styled from "styled-components";


export const MainStyled = styled.main`
   display: flex;
   flex-direction: column;
   gap: 1rem;

   @media (min-width: 800px) {
      flex-direction: row;
      align-items: center;
      height: 100vh;
   }
`;
