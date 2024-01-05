import * as React from 'react';
import { Label, PrimaryButton, Stack } from '@fluentui/react';
import { IMainProps } from './Main';
import { formatDatetimeBr } from "./services";

export interface IHelloWorldProps extends IMainProps {

}

export interface IHelloWorldState {
  name?: string;
  UpdateDate?: Date;
}

export class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      name: props.name
    }
  }

  componentDidMount(): void {
    //Faça alguma coisa no onload do componente
  }

  componentDidUpdate(prevProps: Readonly<IHelloWorldProps>, prevState: Readonly<IHelloWorldState>, snapshot?: any): void {

    if (this.props.name !== prevProps.name) {
      //faça alguma coisa após props.name ser modificado
    }
  }

  private onCLickButton = () => {
    this.setState({
      name: "Nome Novo",
      UpdateDate: new Date()
    });
  }

  public render(): React.ReactNode {
    return (
      <Stack style={{ width: "100%" }}>
        <Label>Atualido em {this.state.UpdateDate && formatDatetimeBr(this.state.UpdateDate)}</Label>
        <Label>
          {this.state.name}
        </Label>
        <PrimaryButton onClick={this.onCLickButton}>Enviar</PrimaryButton>
      </Stack>
    )
  }
}
