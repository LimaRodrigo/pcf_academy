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
      const responseEntities = await BO.GetEntities();
      let responseAttributes: IComboBoxOption[] = [];
      if (props.entity)
        responseAttributes = await BO.GetAttributes(props.entity);
      SetState({
        ...state,
        optionsEntity: responseEntities,
        optionEntityKeySelected: props.entity ?? undefined,
        optionsAttribute: responseAttributes,
        optionAttributeKeySelected: props.attribute ?? undefined,
        isLoading: false,
      });
    }
    void onload();
  }, []);


  const OnChangeComboBoxEntity = async (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {

    SetState({
      ...state,
      optionsAttribute: [],
      optionAttributeKeySelected: undefined,
      isLoading: true,
    });

    const entity = typeof option?.key === "string" ? option.key : "";
    const response = await BO.GetAttributes(entity);

    SetState({
      ...state,
      optionEntityKeySelected: entity,
      optionsAttribute: response,
      isLoading: false,
    });
    props.SetInputChanges(entity, undefined);
  }

  const OnChangeComboBoxAttribute = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
    const attribute = typeof option?.key === "string" ? option.key : undefined;
    SetState({
      ...state,
      optionAttributeKeySelected: attribute,

    });
    props.SetInputChanges(state.optionEntityKeySelected, attribute);
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
              onChange={(event, option, index, value) => { void OnChangeComboBoxEntity(event, option, index, value); }}
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