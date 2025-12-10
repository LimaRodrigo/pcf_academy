import * as React from 'react';
import {
    FluentProvider,
    webLightTheme
} from '@fluentui/react-components';


import { GlobalContextProvider } from './contexts/GlobalContext';
import Home from './pages/Home';


export interface IMainProps {
    context?: ComponentFramework.Context<any>;
}


function Main(props: IMainProps) {
    return (
        <FluentProvider theme={webLightTheme}>
            <GlobalContextProvider>
                <Home />
            </GlobalContextProvider>
        </FluentProvider>
    );
}

export default Main;