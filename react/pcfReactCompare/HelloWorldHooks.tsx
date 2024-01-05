import * as React from 'react';
import { Label, PrimaryButton, Stack } from '@fluentui/react';
import { IMainProps } from './Main';
import { useEffect, useState } from 'react';
import { formatDatetimeBr } from "./services";

export interface IHelloWorldHooksProps extends IMainProps {

}

export interface IHelloWorldHooksState {
    name?: string;
    UpdateDate?: Date;
}

export function HelloWorldHooks(props: IHelloWorldHooksProps) {
    const [state, setState] = useState<IHelloWorldHooksState>({
        name: props.name
    });

    useEffect(() => {
        //Faça alguma coisa no onload do componente
    }, []);

    useEffect(() => {
        //faça alguma coisa após props.name ser modificado
    }, [props.name]);

    const onClickButton = () => {
        setState({
            name: "Nome Novo",
            UpdateDate: new Date()
        });
    }

    return (
        <Stack style={{ width: "100%" }}>
            <Label>Atualido em {state.UpdateDate && formatDatetimeBr(state.UpdateDate)}</Label>
            <Label>
                {state.name}
            </Label>
            <PrimaryButton onClick={onClickButton}>Enviar</PrimaryButton>
        </Stack>
    );
}