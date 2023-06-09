import styled from "styled-components";


export const FormCreateStyled = styled.form`
   display: flex;
   flex-direction: column;
   width: 22rem;
   height: 34rem;
   padding: 1rem;

   h3{
      padding-left: 0.8rem;
   }

   @media (min-width: 800px) {
      width: 25rem;
      height: 32rem;
      justify-content: center;
   }
`;


