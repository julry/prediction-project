import styled from 'styled-components';
import { Border } from './Border';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border-radius: 20px;
  width: 100%;
  height: 25%;
  min-height: calc(4em + 5vh);
  max-height: 260px;
  max-width: 785px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;

  @media screen and (max-width: 330px) {
    font-size: 14px;
  }

  @media screen and (min-width: 700px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 32px;
    height: 240px;
    width: 785px;
  }

  @media screen and (orientation: landscape) and (max-height: 640px) and (max-width: 999px) {
    font-size: 11px;
    max-width: 320px;
  }
`;

const BorderStyled = styled(Border)`
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: -1;
  width: calc(100% + 3px);
  height: calc(100% + 3px);

  & rect {
    width: calc(100% - 3px);
    height: calc(100% - 3px);
  }
`;

export const TextWrapper = (props) => (
    <Wrapper>
        <p>{props.children}</p>
        <BorderStyled/>
    </Wrapper>
);
