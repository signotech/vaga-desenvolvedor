import styled from "styled-components";

export const FormCreateStyled = styled.form`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 22rem;
   height: 27rem;
   padding: 1rem;

   h3{
      padding-left: 0.5rem;
   }

   @media (min-width: 800px) {
      width: 27rem;
      height: 25rem;
      gap: 1rem;
      justify-content: center;
   }
`;


