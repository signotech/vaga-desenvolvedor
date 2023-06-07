import styled from "styled-components";


export const FormOrderStyled = styled.form`
   display: flex;
   flex-direction: column;
   width: 22rem;
   height: 19rem;
   padding: 1rem;

   h2{
      padding-left: 0.8rem;
   }

   @media (min-width: 800px) {
      width: 26rem;
      height: 19rem;
      gap: 1rem;
      justify-content: center;
   }
`;