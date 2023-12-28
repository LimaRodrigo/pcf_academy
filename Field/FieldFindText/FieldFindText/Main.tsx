import * as React from "react";
import { ComboBox, IComboBox, IComboBoxOption, IStackStyles, Label, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { useEffect, useState } from "react";
import * as BO from "./Business"

export interface IMainProps {
  entity?: string;
  attribute?: string;
  SetInputChanges: (entity: string | undefined, attribute: string | undefined) => void;
}

export interface IMainState {
  optionsEntity: IComboBoxOption[],
  optionEntityKeySelected?: string,
  optionsAttribute: IComboBoxOption[],
  optionAttributeKeySelected?: string,
  isLoading: boolean
}

export function Main(props: IMainProps) {
  const [state, SetState] = useState<IMainState>({ optionsEntity: [], optionsAttribute: [], isLoading: false });


  useEffect(() => {
    const onload = async () => {
      SetState({
        ...state,
        optionsAttribute: [],
        optionAttributeKeySelected: undefined,
        optionsEntity: [],
        optionEntityKeySelected: undefined,
        isLoading: true,
      });
      let responseEntities: IComboBoxOption[] = [];
      let responseAttributes: IComboBoxOption[] = [];
      responseEntities = await BO.GetEntities();
      if (props.entity)
        responseAttributes = await BO.GetAttributes(props.entity);
      SetState({
        ...state,
        optionsEntity: responseEntities,
        optionEntityKeySelected: props.entity ? props.entity : undefined,
        optionsAttribute: responseAttributes,
        optionAttributeKeySelected: props.attribute ? props.attribute : undefined,
        isLoading: false,
      });
    }
    onload();
  }, []);


  const OnChangeComboBoxEntity = async (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {

    SetState({
      ...state,
      optionsAttribute: [],
      optionAttributeKeySelected: undefined,
      isLoading: true,
    });

    let response = await BO.GetAttributes(option?.key! as string);

    SetState({
      ...state,
      optionEntityKeySelected: option?.key as string,
      optionsAttribute: response,
      isLoading: false,
    });
    props.SetInputChanges(option?.key as string, undefined);
  }

  const OnChangeComboBoxAttribute = async (event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined) => {
    SetState({
      ...state,
      optionAttributeKeySelected: option?.key as string,

    });
    props.SetInputChanges(state.optionEntityKeySelected,  option?.key as string);
  }

  return (
    <Stack style={{ maxWidth: "425px" }}>
      <Stack horizontal style={{ flexWrap: "wrap" }} >
        {console.log("state", state)}
        <Stack horizontal tokens={{ childrenGap: 10, padding: "5px" }} >
          <Stack horizontalAlign="start" >
            <Label>Tabela</Label>
            <ComboBox
              allowFreeform={false}
              autoComplete={'on'}
              options={state.optionsEntity}
              selectedKey={state.optionEntityKeySelected}
              onChange={OnChangeComboBoxEntity}
              disabled={state.isLoading}
            />
          </Stack>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 10, padding: "5px" }}>
          <Stack horizontalAlign="start">
            <Label>Atributo</Label>
            <ComboBox
              allowFreeform={false}
              autoComplete={'on'}
              options={state.optionsAttribute}
              selectedKey={state.optionAttributeKeySelected}
              onChange={OnChangeComboBoxAttribute}
              disabled={state.isLoading || !state.optionEntityKeySelected}
              defaultValue={undefined}
            />
          </Stack>
        </Stack >

      </Stack>
      {state.isLoading &&
        <Stack horizontalAlign="center" verticalAlign="center" style={{ padding: "7px" }}>
          <Spinner size={SpinnerSize.medium} label="Carregando" />
        </Stack >
      }
    </Stack>
  );
}