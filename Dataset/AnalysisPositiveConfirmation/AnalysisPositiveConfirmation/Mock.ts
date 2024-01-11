import { IPositiveConfirmation } from "./model";

export const isMock = window.location.hostname === "localhost";


export const columnsDataset = [
    {
      "name": "createdon",
      "displayName": "Data de Criação",
      "dataType": "DateAndTime.DateAndTime",
      "alias": "createdon",
      "order": 0,
      "visualSizeFactor": 125,
      "isHidden": false,
      "imageProviderWebresource": "",
      "imageProviderFunctionName": "",
      "isPrimary": false,
      "cellType": "",
      "disableSorting": false
    },
    {
        "name": "academy_code",
        "displayName": "Code",
        "dataType": "SingleLine.Text",
        "alias": "academy_code",
        "order": 1,
        "visualSizeFactor": 108,
        "isHidden": false,
        "imageProviderWebresource": "",
        "imageProviderFunctionName": "",
        "isPrimary": true,
        "cellType": "",
        "disableSorting": false
    },
    {
        "name": "academy_question",
        "displayName": "Question",
        "dataType": "SingleLine.Text",
        "alias": "academy_question",
        "order": 2,
        "visualSizeFactor": 300,
        "isHidden": false,
        "imageProviderWebresource": "",
        "imageProviderFunctionName": "",
        "isPrimary": false,
        "cellType": "",
        "disableSorting": false
    },
    {
        "name": "academy_answeriscorrect",
        "displayName": "Answer Is Correct",
        "dataType": "TwoOptions",
        "alias": "academy_answeriscorrect",
        "order": 3,
        "visualSizeFactor": 143,
        "isHidden": false,
        "imageProviderWebresource": "",
        "imageProviderFunctionName": "",
        "isPrimary": false,
        "cellType": "",
        "disableSorting": false
    },
    {
        "name": "academy_incidentid",
        "displayName": "IncidentId",
        "dataType": "Lookup.Simple",
        "alias": "academy_incidentid",
        "order": 4,
        "visualSizeFactor": 100,
        "isHidden": false,
        "imageProviderWebresource": "",
        "imageProviderFunctionName": "",
        "isPrimary": false,
        "cellType": "",
        "disableSorting": false
    },
    {
        "name": "academy_positiveconfimationprincipal",
        "displayName": "Positive Confimation Principal",
        "dataType": "Lookup.Simple",
        "alias": "academy_positiveconfimationprincipal",
        "order": 5,
        "visualSizeFactor": 214,
        "isHidden": false,
        "imageProviderWebresource": "",
        "imageProviderFunctionName": "",
        "isPrimary": false,
        "cellType": "",
        "disableSorting": false
    }
];

export const sortedRecordsId = [
    "bec2cbc6-ecaf-ee11-a569-6045bd397515",
    "24c3cbc6-ecaf-ee11-a569-6045bd397515",
    "2ac3cbc6-ecaf-ee11-a569-6045bd397515",
    "34c3cbc6-ecaf-ee11-a569-6045bd397515",
    "41c3cbc6-ecaf-ee11-a569-6045bd397515",
    "04dbd45e-36ab-ee11-a569-6045bd397515",
    "05dbd45e-36ab-ee11-a569-6045bd397515",
    "07dbd45e-36ab-ee11-a569-6045bd397515",
    "08dbd45e-36ab-ee11-a569-6045bd397515",
    "09dbd45e-36ab-ee11-a569-6045bd397515"
]

export const positiveConfirmations: IPositiveConfirmation[] = [
    {
        "academy_positiveconfimationid": "bec2cbc6-ecaf-ee11-a569-6045bd397515",
        "createdon": "2024-01-10T19:16:46.000Z",
        "academy_code": "POS-00000041",
        "academy_question": " - 10/01/2024, 16:16:43",
        "academy_answeriscorrect": "0",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": null
    },
    {
        "academy_positiveconfimationid": "24c3cbc6-ecaf-ee11-a569-6045bd397515",
        "createdon": "2024-01-10T19:16:46.000Z",
        "academy_code": "POS-00000042",
        "academy_question": "Qual o seu logradouro?",
        "academy_answeriscorrect": "0",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "bec2cbc6-ecaf-ee11-a569-6045bd397515"
            },
            "name": "POS-00000041"
        }
    },
    {
        "academy_positiveconfimationid": "2ac3cbc6-ecaf-ee11-a569-6045bd397515",
        "createdon": "2024-01-10T19:16:46.000Z",
        "academy_code": "POS-00000043",
        "academy_question": "Qual os quatro últimos dígitos do seu celular?",
        "academy_answeriscorrect": "1",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "bec2cbc6-ecaf-ee11-a569-6045bd397515"
            },
            "name": "POS-00000041"
        }
    },
    {
        "academy_positiveconfimationid": "34c3cbc6-ecaf-ee11-a569-6045bd397515",
        "createdon": "2024-01-10T19:16:46.000Z",
        "academy_code": "POS-00000044",
        "academy_question": "Qual a sua cidade?",
        "academy_answeriscorrect": "0",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "bec2cbc6-ecaf-ee11-a569-6045bd397515"
            },
            "name": "POS-00000041"
        }
    },
    {
        "academy_positiveconfimationid": "41c3cbc6-ecaf-ee11-a569-6045bd397515",
        "createdon": "2024-01-10T19:16:46.000Z",
        "academy_code": "POS-00000045",
        "academy_question": "Qual os três últimos dígitos do CEP?",
        "academy_answeriscorrect": "1",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "bec2cbc6-ecaf-ee11-a569-6045bd397515"
            },
            "name": "POS-00000041"
        }
    },
    {
        "academy_positiveconfimationid": "04dbd45e-36ab-ee11-a569-6045bd397515",
        "createdon": "2024-01-04T19:20:51.000Z",
        "academy_code": "POS-00000036",
        "academy_question": " - 04/01/2024, 16:20:50",
        "academy_answeriscorrect": "0",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": null
    },
    {
        "academy_positiveconfimationid": "05dbd45e-36ab-ee11-a569-6045bd397515",
        "createdon": "2024-01-04T19:20:51.000Z",
        "academy_code": "POS-00000037",
        "academy_question": "Qual os três últimos dígitos do CEP?",
        "academy_answeriscorrect": "1",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "04dbd45e-36ab-ee11-a569-6045bd397515"
            },
            "name": "POS-00000036"
        }
    },
    {
        "academy_positiveconfimationid": "07dbd45e-36ab-ee11-a569-6045bd397515",
        "createdon": "2024-01-04T19:20:51.000Z",
        "academy_code": "POS-00000038",
        "academy_question": "Qual os quatro últimos dígitos do seu celular?",
        "academy_answeriscorrect": "0",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "04dbd45e-36ab-ee11-a569-6045bd397515"
            },
            "name": "POS-00000036"
        }
    },
    {
        "academy_positiveconfimationid": "08dbd45e-36ab-ee11-a569-6045bd397515",
        "createdon": "2024-01-04T19:20:51.000Z",
        "academy_code": "POS-00000039",
        "academy_question": "Qual a sua cidade?",
        "academy_answeriscorrect": "1",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "04dbd45e-36ab-ee11-a569-6045bd397515"
            },
            "name": "POS-00000036"
        }
    },
    {
        "academy_positiveconfimationid": "09dbd45e-36ab-ee11-a569-6045bd397515",
        "createdon": "2024-01-04T19:20:51.000Z",
        "academy_code": "POS-00000040",
        "academy_question": "Qual o seu logradouro?",
        "academy_answeriscorrect": "1",
        "academy_incidentid": {
            "etn": "incident",
            "id": {
                "guid": "18e32086-2265-4af5-ab1e-92308f789b6e"
            },
            "name": "Solicitação de Empréstimo"
        },
        "academy_positiveconfimationprincipal": {
            "etn": "academy_positiveconfimation",
            "id": {
                "guid": "04dbd45e-36ab-ee11-a569-6045bd397515"
            },
            "name": "POS-00000036"
        }
    }
];