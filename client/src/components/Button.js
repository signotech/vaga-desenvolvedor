import styled, { css } from 'styled-components';

export default styled.button`
  width: 170px;
  padding: 8px 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.main};

  border: 2px solid ${({ theme }) => theme.colors.main};
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: ${({ theme }) => theme.colors.main};
    color: #fff;
  }

  &:active{
    background-color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.dark};
  }

  ${({ theme, form }) => form && css`
    width: 100%;
    height: 50px;
    background-color: ${theme.colors.main};
    color: #fff;

    &:hover{
    background-color: ${theme.colors.darker};
    border: 2px solid ${theme.colors.darker};
    color: #fff;
    }

    &:active{
      background-color: ${theme.colors.main};
      border: 2px solid ${theme.colors.main};
    }

  `}
`;
