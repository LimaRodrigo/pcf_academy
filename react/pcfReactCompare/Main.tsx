import * as React from 'react';
import { HelloWorld } from './HelloWorld';
import { HelloWorldHooks } from './HelloWorldHooks';
import { Stack } from '@fluentui/react';

export interface IMainProps {
    name?: string;
}

export function Main(props: IMainProps) {

    return (
        <Stack horizontal horizontalAlign='space-between' tokens={{childrenGap: 10}} style={{width: "100%"}}>
            <HelloWorld name={props.name} />
            <HelloWorldHooks name={props.name} />
        </Stack>
    );
}