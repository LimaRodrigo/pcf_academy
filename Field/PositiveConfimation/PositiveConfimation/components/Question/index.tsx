import { Stack, Toggle, Text, Icon, IconButton } from '@fluentui/react';
import * as React from 'react';
import { IQuestion } from '../../model';
import { IGlobalContext, useGlobalContext } from "../../Context"
import { useContext } from 'react';

interface IQuestionProps {
    question: IQuestion;
}

export function Question(props: IQuestionProps) {
    const context = useContext<IGlobalContext | undefined>(useGlobalContext);
    const onclickAnswer = (answer: boolean) => {
        let question = context?.state?.questions ? [...context.state.questions] : [];

        question?.forEach(x => {
            if (x.academy_questionspositiveconfimationid === props.question.academy_questionspositiveconfimationid)
                x.isCorrect = answer;
        });
        context?.setState({ ...context.state!, questions: question!, answerQuestionId: props.question.academy_questionspositiveconfimationid })
    }

    return (
        <Stack horizontalAlign='start' style={stackBase} >
            <Stack horizontal horizontalAlign='start' tokens={{ padding: "5px", childrenGap: 10 }} >
                <Stack.Item align='end'>
                    <Icon iconName="CaretSolidMirrored" />
                </Stack.Item>
                <Stack.Item align='end'>
                    <Text variant='mediumPlus'>{props.question.academy_question}</Text>
                </Stack.Item>
            </Stack>
            <Stack horizontal horizontalAlign='start' tokens={{ padding: "3px", childrenGap: 10 }}>
                <Stack.Item align='center' tokens={{ margin: "0px 0px 0px 20px" }}>
                    {props.question.answer}
                </Stack.Item>
                <Stack.Item align='end' >
                    <IconButton
                        styles={{ icon: { color: "#32CD32" } }}
                        iconProps={{ iconName: "Emoji2" }}
                        aria-label="Emoji2"
                        onClick={() => { onclickAnswer(true) }}
                        disabled={context?.state?.isLoading}
                    />

                    <IconButton
                        styles={{
                            icon: { color: "red" },
                            root: { marginLeft: "4quepx" }
                        }}
                        iconProps={{ iconName: "Sad" }}
                        aria-label="Sad"
                        onClick={() => { onclickAnswer(false) }}
                        disabled={context?.state?.isLoading}

                    />
                </Stack.Item>
                <Stack.Item align='end'>

                </Stack.Item>
            </Stack>
        </Stack>
    );
}

const stackBase: React.CSSProperties = {
    height: "80px",
    borderRadius: "5px",
    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)"
}