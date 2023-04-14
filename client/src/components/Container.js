import styled from 'styled-components';

export default styled.div`
  font-family: 'Inter', sans-serif;

  h1 {
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    h2 {
      color: #fff;
      font-size: 2rem;
      font-weight: 600;
    }
  }

  input {
    width: 100%;

    margin-top: 35px;
    height: 45px;
    padding: 0px 15px;

    border-radius: 10px;
    border: none;
    outline: none;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .orderBy{
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 40px;
    cursor: pointer;
  }
`;
