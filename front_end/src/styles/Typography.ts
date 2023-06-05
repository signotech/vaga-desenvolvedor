import { createGlobalStyle } from "styled-components"

export const GlobalTypography = createGlobalStyle`

.Title.header{
   font-size: 1.8rem;
   font-weight: 600;
   letter-spacing: 0.10rem;
   color: var(--grey-0);
}
.Title.one{
   font-size: 1.6rem;
   font-weight: 600;
   letter-spacing: 0.10rem;
   color: var(--grey-0);
}

.Title.two{
   font-size: 1.5rem;
   font-weight: 400;
   color: var(--grey-2);
}

.Title.three{
   font-size: 1.3rem;
   font-weight: 600;
   color: var(--grey-3);
}

.Headline{
   font-size: 0.75rem;
   font-weight: 400;
   color: var(--grey-400);
}
.label{
   font-size: 0.90rem;
   font-weight: 400;
   color: var(--label-text-color);
}

.Headline.Bold{
   font-size: 1rem;
   font-weight: 700;
   color: var(--grey-0);
}

.Headline.Italic{
   font-size: 1rem;
   font-weight: 600;
   color: var(--grey-0);
   font-style: italic;
}

`