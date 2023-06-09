import styled from "styled-components";


export const LiStyled = styled.li`
   display: flex;
   flex-direction: column;
   
   gap: 1rem;
   border-left: 0.5rem solid red;
   border-radius: 0.5rem;
   position: relative;


   div{
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      
      p{
         font-size: 1.1rem;
         span{
            color: var(--names-item-collections);
            font-weight: 600;
         }
      }
   }

   i{
      position: absolute;
      top: 1rem;
      right: 1rem;
   }

   .icon__edit{
      position: absolute;
      top: 4rem;
      right: 1rem;
   }
`;
