
import styled from "styled-components";

export const ButtonLogin = styled.button`
   display: flex;
   height: 2.3rem;
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
export const ButtonItems = styled.button`
   display: flex;
   width: 100%;
   max-width:10rem ;
   height: 2.3rem;
   border-radius: 4px;
   background-color:var(--button-color-login) ;
   color: var(--grey-0);
   font-size: 1rem;
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
export const ButtonNav = styled.button`
   display: flex;
   width: 7rem;
   height: 2rem;
   padding: 1rem;
   border-radius: 4px;
   background-color:transparent;
   color: var(--grey-0);
   font-size: 1.5rem;
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
export const ButtonNavMob = styled.button`
   display: flex;
   width: 5.5rem;
   height: 2rem;
   padding: 1rem;
   border-radius: 4px;
   background-color:transparent;
   color: var(--grey-300);
   font-size: 1.3rem;
   font-weight:600;
   align-items: center;
   justify-content: center;
   align-self: center;

`

