import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-top: 10px;

  & + & {
    margin-top: 20px;
  }

  .information{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2px;

    strong {
      color: #343434;
      font-size: 1.3rem;
    }

    small{
      color: #5B5B5B;
      font-size: 1rem;
    }

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.dark};
      font-weight: 700;
      font-size: 1rem;

      &:hover{
        text-decoration: underline;
      }
    }
  }

  .actions{
    img{
      cursor: pointer;
      opacity: 0.8;

      &:hover{
        opacity: 1;
      }
    }
  }
`;
