import styled from 'styled-components';
import arrow from '../../assets/arrow.svg';

export default styled.select`
width: 100px;
      padding: 5px;
      appearance: none;
      -webkit-appearance: none;
      border:none;
      background-color: transparent;
      color: #fff;
      font-size: 1.2rem;
      background-image: url(${arrow});
      background-repeat: no-repeat;
      background-position: 100%;
      cursor: pointer;
      outline: none;

      option {
        color: black;
      }

      &:active{
        background-color: #353535;
        border-radius: 5px;
      }
`;
