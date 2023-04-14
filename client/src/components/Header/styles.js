import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  background-color: #353535;
  font-family: 'Inter', sans-serif;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;

    li {
      list-style: none;
      margin-left: 40px;
      padding: 10px;

      a {
        text-decoration: none;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.light};
        transition: 0.2s ease;
        font-size: 17px;

        &:hover{
        color: ${({ theme }) => theme.colors.main};
        text-decoration: underline;
        }
      }


    }
  }
`;
