import styled from 'styled-components';

export const Container = styled.div`
font-family: 'Inter', sans-serif;

  h1 {
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
  }

  .options{
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    gap: 20px;

    a {
      text-decoration: none;
    }
  }
`;

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.main};


  height: 200px;
  width: 200px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  span {
    font-size: 4rem;
    color: white;
  }

  p {
    color: ${({ theme }) => theme.colors.lighter};
  }



`;
