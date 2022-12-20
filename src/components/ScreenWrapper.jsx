import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextWrapper } from './TextWrapper';
import { getRandomText } from '../utils/getRandomText';
import { background, backgroundSm } from '../constants/images';
import { Button } from './Button';
import { getShareParams } from '../utils/getShareParams';
import { openHref } from '../utils/openHref';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 7.6024vw 11.5385vw 0;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media screen and (min-width: 1000px) {
    padding: 50px calc((100vw - 785px) / 2);
  }
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;
`;

const BackgroundSm = styled(Background)`
  object-fit: fill;
  @media screen and (min-width: 501px) {
        display: none;
    }
`;

const BackgroundMd = styled(Background)`
  object-fit: cover;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 6.3081vh;
  
  @media screen and (min-width: 700px) {
    font-size: 25px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 40px;
    margin-bottom: 17px;
  }
`;

const SubTitle = styled.h2`
  font-size: 16px;
  text-transform: uppercase;
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 32px;
  }
`;

const SubTitleWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  padding-top: 0.7em;
  justify-content: center;
  width: 100%;
  height: 4.25em;
  min-height: 3em;
  max-height: 118px;
  font-size: 16px;
  max-width: 668px;
  
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }

  @media screen and (min-width: 1000px) {
    font-size: 32px;
    margin-bottom: 15px;
    padding-top: 19px;
  }
`;

const SubTitleSphere = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: radial-gradient(62.64% 62.64% at 50% 50%, #04866A 0%, rgba(4, 134, 106, 0) 100%);
  filter: blur(18.5px);
  width: 100%;
  height: 100%;
  z-index: -1;
`;


const ButtonStyled = styled(Button)`
  margin-top: 3.5vh;
  
  @media screen and (min-width: 1000px) {
    margin-top: 30px;
    margin-left: auto;
  }
`;

export const ScreenWrapper = () => {
    const [text, setText] = useState('');

    const {image} = getShareParams();
    useEffect(() => {
        if (!text) setText(() => getRandomText());
    }, [text]);

    const onBtnClick = () => {
        window.VK.Auth.login(() => {
            window.VK.Api.call('photos.getWallUploadServer', {v: '5.131'}, function(r) {
                const imgBody = new FormData();
                imgBody.append('photo', image);
                fetch(r.response['upload_url'], {
                    method: 'POST',
                    body: imgBody,
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Headers':'*',
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => console.log('res', res)).catch(e => console.log('error', e));
                // window.VK.Api.call('photos.saveWallPhoto', {v: '5.131'}, function(r) {
                //
                // });
            });
        }, 4);
        // openHref(`https://oauth.vk.com/authorize?client_id=51508653&scope=wall&display=page&redirect_uri=${window.location.href}&response_type=token`)
        // window.VK.Api.call('')

        // window.VK.Api.call('wall.post', {message: text, attachments: 'photo'+image}, function(r) {
        //     console.log(r);
        //     if(r.response) {
        //         console.log('hiii')
        //     }
        // });
        //openHref(`https://oauth.vk.com/authorize?${queryParams.toString()}`)
    }

    return (
        <Wrapper>
            <BackgroundWrapper>
                <BackgroundMd src={background} alt={''} />
                <BackgroundSm src={backgroundSm} alt={''} />
            </BackgroundWrapper>
            <Title>{'Предсказание\nот Искусственного Интеллекта'}</Title>
            <SubTitleWrapper>
                <SubTitleSphere />
                <SubTitle>{'Что ждёт тебя\nв карьерном будущем?'}</SubTitle>
            </SubTitleWrapper>
            <TextWrapper>{text}</TextWrapper>
            <ButtonStyled onClick={onBtnClick}> Поделиться </ButtonStyled>
            {/*<div className={'testAnimation'}></div>*/}
        </Wrapper>
    )
}