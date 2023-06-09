import styled from "styled-components";


export const UlStyled = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 1rem;


   div{
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }
   @media (min-width: 800px) {
      max-width: 43rem;
      }
`;


