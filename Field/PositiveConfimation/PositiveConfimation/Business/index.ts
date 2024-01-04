import { IQuestion } from "../model";
import * as serviceDynamics from "../Service"
import * as MOCK from "../Mock"

export const getQuestions = async (idCustomer: string): Promise<IQuestion[]> => {
    let lista: IQuestion[] = [];

    if (MOCK.isMock) {
        await serviceDynamics.sleep(1000);
        return serviceDynamics.getRandonListObjects(MOCK.questions, 3, "academy_questionspositiveconfimationid");
    }

    const config = JSON.parse(await serviceDynamics.getDefaultValueEnvironmentVariableBySchemaname("academy_positiveconfirmationconfig"));

    const odata = `?$select=academy_entity, academy_fieldname,academy_question,createdon&$filter=academy_entity eq 'account'`;
    const parameters = serviceDynamics.getRandonListObjects((await serviceDynamics.RetrieveMultipleRecords("academy_questionspositiveconfimation", odata)).entities, config.totalQuestions, "academy_questionspositiveconfimationid");

    if (parameters.length === 0) return [];


    let odataAccount = `?$select=${parameters.map(x => x.academy_fieldname).toString()}`;
    let response = await serviceDynamics.RetrieveRecord("account", idCustomer, odataAccount);

    parameters.forEach((x) => {
        if (response[x.academy_fieldname])
            lista.push(
                {
                    ...x,
                    answer: response[x.academy_fieldname]
                } as IQuestion
            )

    });

    return lista;
}

export const createPositiveConfirmation = async (questions: IQuestion[], incidentId: string) => {
    if (MOCK.isMock) {
        await serviceDynamics.sleep(2000);
        return;
    }
    let positiveGroupId = await serviceDynamics.CreateRegisterAsync("academy_positiveconfimation",
        {
            "academy_IncidentId@odata.bind": `/incidents(${incidentId})`,
            academy_question: ` - ${new Intl.DateTimeFormat("pt-br", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
            }).format(new Date())}`
        });

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        let data = {
            academy_question: question.academy_question,
            academy_answeriscorrect: question.isCorrect,
            "academy_positiveconfimationprincipal@odata.bind": `/academy_positiveconfimations(${positiveGroupId})`,
            "academy_IncidentId@odata.bind": `/incidents(${incidentId})`
        }
        await serviceDynamics.CreateRegisterAsync("academy_positiveconfimation", data);
    }
}