import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScreenWrapper } from './components/ScreenWrapper';
import { robot } from './constants/images';
import { ShareModal } from './components/ShareModal';
import { getRandomText } from './utils/getRandomText';
import { reachMetrikaGoal } from './utils/reachMetrikaGoal';

const ContentWrapper = styled.div`
  height: ${({height}) => height};
  overflow: hidden;
  position: relative;
  width: 100vw;
`;

const Wrapper = styled.div`
  height: 100%;
  filter: ${({isModalOpen}) => isModalOpen ? 'blur(3.5px)' : 'unset'};
`;

const AnimationWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 30%;

  @media screen and (min-width: 1000px) {
    height: 52%;
    max-height: 430px;
  }

  @media screen and (max-height: 700px) {
    max-height: 300px;
  }

  @media screen and (orientation: landscape) and (max-height: 640px) and (max-width: 999px) {
    height: 55%;
  }
`;

const Animation = styled.img`
  height: 100%;
  object-fit: contain;
`;

function App() {
    const [height, setHeight] = useState('100vh');
    const [isSharing, setIsSharing] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        function handleResize() {
            const viewportHeight = document.documentElement.clientHeight;
            setHeight(viewportHeight + 'px');
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!text) setText(() => getRandomText());
    }, [text]);

    const onLinkCopy = () => {
        const copyText = `Мое предсказание на 2023 год от Искусственного Интеллекта: «${text.replaceAll('\n', ' ')}»! 
Расскажи о своем вузе и получи свое предсказание: https://ru.surveymonkey.com/r/J7WWZDP!`;
        if (window.clipboardData && window.clipboardData.setData) {
            return window.clipboardData.setData('Text', copyText);
        } else if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(copyText);
        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            const isOS = () => navigator.userAgent.match(/ipad|iphone/i);
            const textarea = document.createElement('textarea');
            textarea.textContent = copyText;
            textarea.style.position = 'fixed';
            textarea.disabled = true;
            document.body.appendChild(textarea);
            if (isOS()) {
                const range = document.createRange();
                range.selectNodeContents(textarea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textarea.setSelectionRange(0, 999999);
            } else {
                textarea.select();
            }
            try {
                return document.execCommand('copy');
            } catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
                return {error: true};
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    const onLinkShare = () => {
        onLinkCopy();
        reachMetrikaGoal('link');
        setTimeout(() => setIsSharing(false), 3500);
    };

    return (
        <ContentWrapper height={height}>
            <Wrapper isModalOpen={isSharing}>
                <ScreenWrapper setIsSharing={setIsSharing} text={text}/>
                <AnimationWrapper>
                    <Animation src={robot} alt={''}/>
                </AnimationWrapper>
            </Wrapper>
            {isSharing && (
                <ShareModal
                    onLinkShare={onLinkShare}
                    text={text}
                    onClose={() => setIsSharing(false)}
                />
            )}
        </ContentWrapper>
    );
}

export default App;
