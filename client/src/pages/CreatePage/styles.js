import styled from 'styled-components';

export const Container = styled.div`
font-family: 'Inter', sans-serif;

  h1 {
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
  }

  .header{
    display: flex;
    flex-direction: column;
    align-items: start;

    h2 {
      color: #fff;
      font-size: 1.7rem;
      margin-bottom: 10px;
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.main};
      font-weight: 600;
    }
  }
`;

export const InputCustomer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #fff;
`;
