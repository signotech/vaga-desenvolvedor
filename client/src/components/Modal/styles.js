import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  font-family: 'Inter', sans-serif;
  width: 700px;
  height: 400px;
  background: #F8F8F8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
`;

export const Container = styled.div`
  h1 {
    color: #232323;
    font-weight: 600;
  }
`;

export const List = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  background-color: #ccc;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;

  &:hover{
    background-color: #bfbfbf;
  }

`;
