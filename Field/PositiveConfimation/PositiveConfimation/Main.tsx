import * as React from 'react';
import { Label, Separator, Stack, mergeStyles, Icon, Text, PrimaryButton, MessageBar, MessageBarButton, MessageBarType, Spinner, ProgressIndicator } from '@fluentui/react';
import { Question } from './components/Question';
import { IGlobalState, useGlobalContext } from './Context';
import { useEffect, useState } from 'react';
import * as BO from "./Business"
import { IQuestion } from './model';

export interface IMainProps {
  positiveconfimationok: boolean;
  customerId: string;
  incidentId: string;
  setOutputChanges: (confirmation: boolean | undefined, isSucess: boolean | undefined) => void;
}

export function Main(props: IMainProps) {
  const [state, setState] = useState<IGlobalState>({
    questions: [],
    isComplete: false,
    isCompleteConfirmation: props.positiveconfimationok,
    isLoading: true,
    incidentId: props.incidentId
  });

  useEffect(() => {
    onload();
  }, []);

  useEffect(() => {
    onload();
  }, [props.customerId, props.incidentId]);

  useEffect(() => {
    let response = state.questions.filter(x => x.isCorrect === undefined);
    if (state.questions.length > 0 && response.length === 0)
      setState({ ...state, isComplete: true });
  }, [state.answerQuestionId]);

  const onload = async () => {
    let response: IQuestion[] = [];
    if (!props.positiveconfimationok && props.customerId)
      response = await BO.getQuestions(props.customerId);
    setState({
      questions: response,
      isComplete: false,
      isCompleteConfirmation: props.positiveconfimationok,
      isLoading: false,
      incidentId: props.incidentId
    });
  }


  const getIcon = (item: IQuestion) => {
    switch (item.isCorrect) {
      case true:
        return <Icon iconName="Accept" styles={{ root: { color: "green" } }} />;
      case false:
        return <Icon iconName="Cancel" styles={{ root: { color: "red" } }} />;
      default:
        return <Icon iconName="Unknown" styles={{ root: { color: "orange" } }} />;
    }
  }
  const setConfimation = async () => {
    setState({ ...state, isLoading: true });

    await BO.createPositiveConfirmation(state.questions, props.incidentId);

    let response = state.questions.filter(x => x.isCorrect !== true);
    setState({
      ...state,
      isCompleteConfirmation: true,
      isLoading: false,
      isPossiblityFraud: response.length > 0
    });
    props.setOutputChanges(true, response.length === 0);
  }

  return (
    <Stack style={{ padding: "5px", width: "100%" }}>
      <useGlobalContext.Provider value={{ state: state, setState: setState }}>
        {console.info("PositiveConfimation_state", state)}
        {state.incidentId && <>
          {state.isLoading &&
            <Stack horizontal horizontalAlign='center' style={{ width: "100%" }}>
              <ProgressIndicator styles={{ root: { width: "100%" } }} />
            </Stack>}
          {!state.isLoading && state.isPossiblityFraud ?
            <MessageBar
              messageBarType={MessageBarType.blocked}
              isMultiline={false}
            >
              Possibilidade de fraude, favor encaminhar para o setor responsável.
            </MessageBar>
            :
            <></>
          }
          {
            state.isCompleteConfirmation ?
              <Stack horizontal horizontalAlign='center' verticalAlign='center' tokens={{ childrenGap: 8, padding: "5px" }} styles={{ root: { minHeight: "250px" } }}>
                <Text variant='xLarge'>
                  <Icon iconName="Accept" styles={{ root: { color: "green" } }} />
                  Confirmação positiva concluída.
                </Text>
              </Stack>
              :
              <>
                {state.questions &&

                  state.questions.map((item, i) => {
                    return (<Stack horizontal tokens={{ childrenGap: 8 }} key={item.academy_questionspositiveconfimationid}>
                      <Stack.Item className={verticalStyle}>
                        <Separator vertical>
                          <Text variant='xLarge'>
                            {getIcon(item)}
                          </Text>
                        </Separator>
                      </Stack.Item>
                      <Stack.Item style={{ width: "90%" }}>
                        <Question question={item} />
                      </Stack.Item>
                    </Stack>);
                  })

                }
                {state.isComplete &&
                  <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <MessageBar
                      actions={
                        <div>
                          <MessageBarButton onClick={setConfimation} disabled={state.isLoading}>Sim</MessageBarButton>
                        </div>
                      }
                      messageBarType={MessageBarType.success}
                      isMultiline={false}
                    >
                      Deseja concluir a validação positiva?

                    </MessageBar>
                  </Stack>
                }
              </>

          }
        </>
        }
      </useGlobalContext.Provider>
    </Stack>
  );
}

const verticalStyle = mergeStyles({
  height: '90px',
});