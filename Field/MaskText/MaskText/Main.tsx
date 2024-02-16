import * as React from 'react';
import { MaskedTextField, Stack, TextField } from '@fluentui/react';

export interface IMainProps {
  valor?: string;
  mascara: string;
  SetInputChanges: (valor: string | undefined) => void;
}

export interface IMainState {
  valor?: string;
  mascara: string;
}

export function Main(props: IMainProps) {
  const [state, setState] = React.useState<IMainState>({ valor: props.valor, mascara: props.mascara });

  React.useEffect(() => {
    setState({
      mascara: props.mascara,
      valor: props.valor
    });
  }, [props.mascara, props.valor])

  const maskFormat: { [key: string]: RegExp } = {
    '*': /[a-zA-Z0-9_]/, //Permite números e letras.
    '9': /[0-9]/, // Permite somente números.
    'a': /[a-zA-Z]/, //Permite somente letras.
    's': /[^a-zA-Z 0-9]+/g, //permite letras, números e carateres especiais
  };

  const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    props.SetInputChanges(newValue);
  }

  return (
    <Stack horizontal horizontalAlign='start' styles={{ root: { width: "100%" } }}>

      {console.log("state", state)}
      <MaskedTextField mask={state.mascara} value={state.valor} onChange={onChange} maskFormat={maskFormat} />
    </Stack>
  )
}