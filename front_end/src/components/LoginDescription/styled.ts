import styled from "styled-components";

export const SectionStyled = styled.section`
   width: 21rem;
   margin: 0 auto;

   div {
      display: flex;
      flex-direction: column-reverse;
      gap: 1.8rem;
      align-items: center;
      p {
         height: 14.43rem;
         border: solid 3px var(--border-color);
         display: flex;
         align-items: center;
         padding: 1rem;
      }

      figcaption {
         width: 100%;
         height: 13.75rem;

         img {
            width: 100%;
            height: 100%;
         }
      }

      @media (min-width: 800px) {
         flex-direction: column;
      }
   }

   @media (min-width: 800px) {
      width: 26rem;
      height: 30rem;
   }
`;
