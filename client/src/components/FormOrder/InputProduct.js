import styled from 'styled-components';

export default styled.div`
  background-color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #474747;

  display: flex;
  gap: 10px;

  width: 100%;
  height: 200px;
  padding: 10px 10px;

  border-radius: 5px;
  border: 2px solid #fff;

  .table{
    width: 100%;
  }

  .header-table{
    font-weight: 500;
    display: flex;
    justify-content: space-around;
    color: #B5B5B5;
    border-bottom: 2px solid #ccc;
    padding: 5px;
  }

  .header-table p:nth-child(1), .content-table p:nth-child(1){
    width: 200px;
  }

  .content-table{
    font-weight: 500;
    display: flex;
    justify-content: space-around;
    color: #B5B5B5;
    border-bottom: 1px solid #ccc;
    p {
      color: #474747;
    }
  }
`;
