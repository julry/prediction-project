import React from 'react';
import styled from 'styled-components';
import { ButtonBorder } from './svg/ButtonBorder';

const ButtonStyled = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 225px;
  height: 50px;
  cursor: pointer;

  @media screen and (orientation: landscape) and (max-height: 640px) and (max-width: 999px){
    width: 173px;
    height: 38px;
    font-size: 14px;
  }
`;

const BorderStyled = styled(ButtonBorder)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  & rect {
    width: calc(100% - 5px);
    height: calc(100% - 5px);
  }
`;

export const Button = (props) => (
    <ButtonStyled className={props.className} onClick={props.onClick}>
        <BorderStyled />
        <p>{props.children}</p>
    </ButtonStyled>
);
