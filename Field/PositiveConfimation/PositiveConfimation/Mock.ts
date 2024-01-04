import { IQuestion } from "./model";

export const isMock = window.location.hostname === "localhost";

export const questions: IQuestion[] =
[
    {
      "academy_questionspositiveconfimationid": "4d7d3b35-aea5-ee11-a569-6045bd397515",
      "academy_entity": "account",
      "academy_fieldname": "telephone1",
      "academy_question": "Qual os quatro últimos dígitos do seu celular?",
      "createdon": "2023-12-28T18:23:34Z",
      "answer": "98988877987"
    },
    {
      "academy_questionspositiveconfimationid": "0598608c-a9a5-ee11-a569-6045bd397515",
      "academy_entity": "account",
      "academy_fieldname": "address1_city",
      "academy_question": "Qual a sua cidade?",
      "createdon": "2023-12-28T17:50:21Z",
      "answer": "neverland"
    },
    {
      "academy_questionspositiveconfimationid": "04a93e8e-aea5-ee11-a569-6045bd397515",
      "academy_entity": "account",
      "academy_fieldname": "address1_postalcode",
      "academy_question": "Qual os três últimos dígitos do CEP?",
      "createdon": "2023-12-28T18:26:03Z",
      "answer": "26000-000"
    },
    {
      "academy_questionspositiveconfimationid": "75fb9ad5-ada5-ee11-a569-6045bd397515",
      "academy_entity": "account",
      "academy_fieldname": "address1_county",
      "academy_question": "Qual seu município?",
      "createdon": "2023-12-28T18:20:53Z",
      "answer": "Rio de Janeiro"
    },
    {
      "academy_questionspositiveconfimationid": "75fb9ad5-ada5-ee11-a569-6045bd397518",
      "academy_entity": "account",
      "academy_fieldname": "address1_county",
      "academy_question": "Qual seu Estado?",
      "createdon": "2023-12-28T18:20:53Z",
      "answer": "Rio de Janeiro"
    },
    {
      "academy_questionspositiveconfimationid": "75fb9ad5-ada5-ee11-a569-6045bd397517",
      "academy_entity": "account",
      "academy_fieldname": "address1_county",
      "academy_question": "Qual seu País?",
      "createdon": "2023-12-28T18:20:53Z",
      "answer": "Rio de Janeiro"
    }
  ]; 