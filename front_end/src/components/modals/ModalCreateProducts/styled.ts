import styled from "styled-components";


export const FormCreateStyled = styled.form`
   display: flex;
   flex-direction: column;
   width: 22rem;
   height: 39rem;
   padding: 1rem;

   h3{
      padding-left: 0.5rem;
   }

   @media (min-width: 800px) {
      width: 28rem;
      height: 41rem;
      gap: 0.5rem;
      justify-content: center;
   }
`;


