import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScreenWrapper } from './components/ScreenWrapper';
import { robot } from './constants/images';

const ContentWrapper = styled.div`
  height: ${({height}) => height};
  overflow: hidden;
  position: relative;
  width: 100vw;
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

  @media screen and (max-height: 700px){
    max-height: 300px;
  }
  
  @media screen and (orientation: landscape) and (max-height: 640px) and (max-width: 999px){
    height: 55%;
  }
`;

const Animation = styled.img`
  height: 100%;
  object-fit: contain;
`;

function App() {
    const [height, setHeight] = useState('100vh');

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

    return (
        <ContentWrapper height={height}>
            <ScreenWrapper/>
            <AnimationWrapper>
                <Animation src={robot} alt={''} />
            </AnimationWrapper>
        </ContentWrapper>
    );
}

export default App;
