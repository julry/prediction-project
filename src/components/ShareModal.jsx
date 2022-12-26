import React, { useState } from 'react';
import styled from 'styled-components';
import { LinkIcon } from './svg/LinkIcon';
import { ShareButton } from './ShareButton';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlurBg = styled.div`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.3);
`;

const Content = styled.div`
  margin-top: -6em;
  display: flex;
`;

const LinkIconStyled = styled(LinkIcon)`
  width: 86px;
  height: 64px;
  opacity: ${({shareLinkSaved}) => shareLinkSaved ? '0.3' : '1'};
`;

export const ShareModal = (props) => {
    const [shareLinkSaved, setShareLinkSaved] = useState(false);

    const onLinkClick = () => {
        const shareRes = props.onLinkShare();
        if (!shareRes?.error) {
            setShareLinkSaved(true);
            setTimeout(() => setShareLinkSaved(false), 3500);
        }
    }
    return (
        <Wrapper className={props.className}>
            <BlurBg onClick={props.onClose}/>
            <Content>
                <ShareButton shareDone={shareLinkSaved} onClick={onLinkClick}>
                    <LinkIconStyled shareLinkSaved={shareLinkSaved}/>
                    <p>{shareLinkSaved ? 'Ссылка\nскопирована' : 'Копировать\nссылку'}</p>
                </ShareButton>
            </Content>
        </Wrapper>
    );
};