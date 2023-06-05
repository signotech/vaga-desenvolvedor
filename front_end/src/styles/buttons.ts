
import styled from "styled-components";

export const ButtonLogin = styled.button`
   display: flex;
   width: 90%;
   height: 5rem;
   border-radius: 4px;
   background-color:var(--button-color-login) ;
   color: var(--grey-0);
   font-size: 1.5rem;
   width: 50%;
   height: 2.5rem;
   align-items: center;
   justify-content: center;
   align-self: center;

   :hover{
      background-color: var(--grey-0);
      color: var(--button-color-login);
      border: solid 1px var(--button-color-login);
      transition: 1s;
   }
`
