export interface IPositiveConfirmation {
    academy_positiveconfimationid?: string;
    academy_positiveconfimationprincipal?: Ilookup | null;
    academy_incidentid?: Ilookup | null;
    academy_code: string;
    academy_question: string;
    createdon?: string;
    academy_answeriscorrect?: string;
}

export interface Ilookup {
    etn: string;
    id: IlookupId;
    name: string;
}

interface IlookupId {
    guid: string;
}