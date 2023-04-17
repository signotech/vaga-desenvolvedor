import styled from 'styled-components';

export default styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #474747;

  width: 100%;
  height: 40px;
  padding: 0 13px;

  border-radius: 5px;
  border: 2px solid #fff;

  outline: none;
  transition: 0.2s ease;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.main};
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.dark};
  }
`;
