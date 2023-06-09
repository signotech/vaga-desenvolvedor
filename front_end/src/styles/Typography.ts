import { createGlobalStyle } from "styled-components"

export const GlobalTypography = createGlobalStyle`

.Title.header{
   font-size: 1.8rem;
   font-weight: 600;
   letter-spacing: 0.10rem;
   color: var(--grey-0);
}

.label{
   font-size: 0.90rem;
   font-weight: 400;
   color: var(--label-text-color);
}

.Title.Modal{
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--label-text-color);
}

.description.Login{
   font-size: 1.3rem;
   font-weight: 400;
   color: var(--grey-200);
}
.Title.Collections{
   font-size: 2rem;
   font-weight: 400;
   color: var(--grey-300);
}



`