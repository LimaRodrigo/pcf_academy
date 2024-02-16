import * as React from 'react';
import { IStackStyles, Label, MessageBar, MessageBarType, PrimaryButton, ProgressIndicator, Stack, TextField } from '@fluentui/react';
import { IConfigField, IField } from './model/IConfigField';
import * as BO from "./Business"
import { useEffect, useState } from 'react';
import { IMenssageNotification } from './model/IMenssageNotification';

export interface IMain {
  customerId?: string;
}

export interface IMainState {
  customerId?: string;
  configFields?: IConfigField;
  customer?: any;
  menssageBar?: IMenssageNotification;
  isLoading: boolean;
}

export function Main(props: IMain) {
  const [state, setState] = useState<IMainState>({ customerId: props.customerId, isLoading: true });

  useEffect(() => {

    const Onload = async () => {
      try {
        if (!props.customerId) {
          setState({
            ...state,
            isLoading: false,
          });
          return;
        }

        let configFields = await BO.getConfigVariable();
        let customer = await BO.getDataCustomer(props.customerId!, configFields);
        configFields.fields.forEach(x => x.value = customer[x.logicalName]);

        setState({
          ...state,
          customerId: props.customerId,
          isLoading: false,
          customer: customer,
          configFields: configFields
        });
      } catch (error) {
        setMenssage({ type: MessageBarType.error, text: `Ocorreu ao carregar os dados iniciais.` });
        console.error(error);
      }
    }
    Onload();
  }, [props.customerId]);


  const generateField = (filed: IField) => {
    switch (filed.type) {
      case "text":
        return generateFieldText(filed);
      default:
        break;
    }
  }

  const generateFieldText = (filed: IField) => {
    return (
      <Stack horizontalAlign='start' key={filed.logicalName} style={{ width: "100%" }} tokens={{ padding: "5px 15px 5px 15px" }}>
        <Label>{filed.displayName}</Label>
        <TextField
          required={filed.required}
          disabled={filed.readonly || state.isLoading}
          value={filed.value}
          styles={{ root: { width: "100%" } }}
          onChange={(event: any, newValue?: string | undefined) => { onChangeText(filed, newValue); }}
          errorMessage={filed.errorMessage}
        />
      </Stack>
    );
  }

  const onChangeText = (field: IField, newValue?: string | undefined,) => {
    let config = state.configFields;
    let item = config?.fields.find(x => x.logicalName == field.logicalName);
    item!.value = newValue;
    item!.errorMessage = newValue ? undefined : "Campo Obrigatório";
    setState({
      ...state,
      configFields: config
    })
  }

  const onClickUpdate = async () => {
    try {
      setState({ ...state, isLoading: true });
      if (!validateForm()) {
        setMenssage({ type: MessageBarType.warning, text: `Preencha os campos obrigatórios` });
        return;
      }


      await BO.updateEntity(state.customerId!, state.configFields!);
      setMenssage({ type: MessageBarType.success, text: `${state.configFields?.entityDisplayname} atualizado com sucesso.` });
    } catch (error) {
      setMenssage({ type: MessageBarType.error, text: `Ocorreu um erro ao atualizar ${state.configFields?.entityDisplayname}.` });
      console.error(error);
    }
  }
  const validateForm = (): boolean => {
    let isFormValid = true;

    state.configFields?.fields.forEach(x => {
      let isValid = validateItemRequired(x);
      if (isFormValid)
        isFormValid = isValid;
    });

    return isFormValid;
  }


  const validateItemRequired = (field: IField): boolean => {
    let isValid = true;
    if (field.required && !field.value) {
      field.errorMessage = "Campo Obrigatório";
      return false;
    }
    field.errorMessage = undefined;
    return isValid;
  }

  const setMenssage = (msg?: IMenssageNotification) => {
    setState({ ...state, menssageBar: msg });
    setTimeout(() => { setState({ ...state, menssageBar: undefined }); }, 5000);
  }


  const generateLoading = () => {
    if (state.isLoading)
      return (<Stack horizontal horizontalAlign='center' style={{ width: "100%" }}>
        <ProgressIndicator styles={{ root: { width: "100%" } }} />
      </Stack>
      );
  }

  const generateMenssageBar = () => {
    if (state.menssageBar)
      return (<MessageBar
        messageBarType={state.menssageBar.type}
        isMultiline={false} >
        {state.menssageBar.text}
      </MessageBar>
      );
  }

  if (state.customerId)
    return (
      <Stack styles={styleStackBase} tokens={{ padding: 5 }}>
        {console.log("Challenge_state", state)}
        {generateLoading()}
        {generateMenssageBar()}
        {state.configFields?.fields && state.configFields?.fields.map((x) => generateField(x))}
        {state.configFields &&
          <Stack horizontal horizontalAlign='end' tokens={{ padding: "5px 15px 5px 15px" }}>
            <PrimaryButton text="Atualizar" onClick={onClickUpdate} allowDisabledFocus disabled={state.isLoading || !state.configFields} />
          </Stack>
        }
      </Stack>
    );
  else
    return (<></>);
}

const styleStackBase: IStackStyles = {
  root: {
    width: "100%"
  }
}
