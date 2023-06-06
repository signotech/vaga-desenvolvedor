import styled from "styled-components";


export const LiStyled = styled.li`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   border-left: 0.5rem solid red;
   border-radius: 0.5rem;
   

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

`;
