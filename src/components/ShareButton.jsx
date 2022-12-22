import React from 'react';
import { ShareBorder } from './svg/ShareBorder';
import styled from 'styled-components';

const ShareBtn = styled.div`
  position: relative;
  height: 158px;
  width: 120px;
  padding: 20px;
  font-size: 12px;
  display: grid;
  grid-template-rows: 90px 1fr;
  white-space: pre-line;
  cursor: pointer;
  
  & + & {
    margin-left: 20px;
  }
  
  @media screen and (max-width: 330px) {
    & + & {
      margin-left: 10px;
    }
  }
`;

const ShareBorderStyled = styled(ShareBorder)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  opacity: ${({shareDone}) => shareDone ? '0.3' : '1'};
`;

export const ShareButton = (props) => (
    <ShareBtn {...props}>
        <ShareBorderStyled shareDone={props.shareDone}/>
        {props.children}
    </ShareBtn>
)