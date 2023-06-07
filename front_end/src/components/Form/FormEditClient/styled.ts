import styled from "styled-components";


export const FormClientStyled = styled.form`
   display: flex;
   flex-direction: column;
   width: 22rem;
   height: 34rem;
   padding: 1rem;

   h2{
      padding-left: 0.8rem;
   }

   @media (min-width: 800px) {
      width: 26rem;
      height: 37rem;
      gap: 1rem;
      justify-content: center;
   }
`;


