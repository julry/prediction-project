import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ScreenWrapper } from './components/ScreenWrapper';

const ContentWrapper = styled.div`
  height: ${({height}) => height};
  overflow: hidden;
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
        </ContentWrapper>
    );
}

export default App;
