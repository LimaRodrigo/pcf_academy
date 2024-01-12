import { createContext } from "react";
import { IQuestion } from "../model";

export interface IGlobalState {
    questions: IQuestion[];
    answerQuestionId?: string;
    isComplete?: boolean;
    isCompleteConfirmation?: boolean;
    isLoading: boolean;
    isPossiblityFraud?: boolean;
    incidentId: string;
}

export interface IGlobalContext {
    state?: IGlobalState | null;
    setState: (data: IGlobalState) => void;
}

export const useGlobalContext = createContext<IGlobalContext | undefined>(undefined);