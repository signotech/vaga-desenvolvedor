import styled from "styled-components";


export const FormStyled = styled.form`
   display: flex;
   flex-direction: column;
   width: 21rem;
   margin: 0 auto;
   border: solid 3px var(--border-color);
   height: 24rem;
   padding: 1rem 0rem;
   background-color: #fefefe3b;

   @media (min-width: 800px) {
      width: 26rem;
      height: 30rem;
      gap: 1rem;
      justify-content: center;
   }
`;
