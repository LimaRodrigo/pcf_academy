import { Label } from "@fluentui/react-components";
import React from "react";

export interface ISamplesMainProps {
    name?: string;
}

/// Example of a class component
export class MainClass extends React.Component<ISamplesMainProps> {
    public render(): React.ReactNode {
        return (
            <Label>
                Hello {this.props.name}!
            </Label>
        )
    }
}

/// Example of a functional component
export const MainFunction: React.FC<ISamplesMainProps> = (props) => {
    return (
        <Label>
            Hello {props.name}!
        </Label>
    )
}

/// Example of a functional component with function declaration
export function MainFunction2(props: ISamplesMainProps) {
    return (
        <Label>
            Hello {props.name}!
        </Label>
    )
};

/// Example of a functional component with arrow function
export const MainArrowFunction = (props: ISamplesMainProps) => {
    return (
        <Label>
            Hello {props.name}!
        </Label>
    );
}

 
