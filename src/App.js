import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScreenWrapper } from './components/ScreenWrapper';
import { robot } from './constants/images';
import { ShareModal } from './components/ShareModal';
import { getRandomText } from './utils/getRandomText';

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
        const screenParam = window.location.href.split('#')[1];
        const newText = getRandomText();
        const textParam = localStorage.getItem('text');
        const message = text ? text
            : screenParam ? textParam ?? newText
                : newText;
        if (!text) {
            setText(() => message);
            localStorage.setItem('text', message);
        }

        if (screenParam) {
            const accessToken = screenParam.replace('access_token=', '');
            postOnWallVk(accessToken, message);
        }
    }, [text]);

    const vkMessage = 'Мое предсказание на 2023 год от Искусственного Интеллекта, расскажи ' +
        'и ты о своем вузе! ' + text.replaceAll('\n', ' ');
    const attachments = 'https://ru.surveymonkey.com/r/J7WWZDP';

    const postOnWallVk = (access_token, newText) => {
        let message = vkMessage;
        if (!text) {
            message += newText.replaceAll('\n', ' ');
        }
        window.VK.Api.call('wall.post', {message, attachments, access_token}, function (r) {
            if (r.response) {
                localStorage.removeItem('text');
                window.location.href = window.location.href.split('#')[0];
            }
        });
        if (typeof window.VK?.UI?.active?.closed !== 'boolean') {
            setIsSharing(true);
        }
    }

    const onVkShare = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('client_id', '51508653');
        queryParams.append('display', 'page');
        queryParams.append('redirect_uri', `${window.location.href.split('#')[0].split('?')[0]}`);
        queryParams.append('scope', 'wall');
        queryParams.append('response_type', 'token');
        const screenParam = window.location.href.split('#')[1];
        if (!screenParam) {
            window.open(`https://oauth.vk.com/authorize?${queryParams.toString()}`,'_self');
        } else {
            const accessToken = screenParam.replace('access_token=', '');
            postOnWallVk(accessToken);
        }
        setIsSharing(false);
    };

    const onLinkCopy = () => {
        const text = attachments + '\n' + vkMessage;
        if (window.clipboardData && window.clipboardData.setData) {
            return window.clipboardData.setData('Text', text);
        } else if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            const isOS = () => navigator.userAgent.match(/ipad|iphone/i);
            const textarea = document.createElement('textarea');
            textarea.textContent = text;
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
                    onVkShare={onVkShare}
                    onLinkShare={onLinkShare}
                    text={text}
                    onClose={() => setIsSharing(false)}
                />
            )}
        </ContentWrapper>
    );
}

export default App;
