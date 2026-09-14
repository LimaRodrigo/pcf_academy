import { Button, Input } from '@fluentui/react-components';
import React, { useCallback, useEffect, useRef } from 'react';
import { SendFilled } from "@fluentui/react-icons";
import './style.css';
export interface MessageInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

function MessageInput(props: MessageInputProps) {
    //1. Desestruturando as props https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
    const { onSendMessage, disabled } = props;

    // 2. Criando a referência para o campo de input (DOM) https://pt-br.react.dev/reference/react/useRef
    const inputRef = useRef<HTMLInputElement>(null);


    // Função para lidar com o clique do botão de envio da mensagem utilizando a referência do input sem usar estado, 
    // assim evitando re-render desnecessário https://pt-br.react.dev/reference/react/useRef
    const handleClick = () => {
        const val = inputRef.current?.value;
        if (val && val.trim() !== "") {
            // Enviando a mensagem via prop callback
            onSendMessage(val);
            // Limpando o valor do input diretamente via referência
            if (inputRef.current) {
                inputRef.current.value = ''; // Limpa o input sem disparar render de estado
                inputRef.current?.focus();
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !disabled) {
            handleClick();
        }
    };

    return (
        <div className='pcf-sample-hooks-form-message-input' >
            {console.log("%c [Render] Renderizando MessageInput...", "color: #00cc66")}
            <Input
                type="text"
                ref={inputRef} // 3. Atribuindo a referência ao input
                disabled={disabled}
                placeholder="Digite sua mensagem..."
                className='pcf-sample-hooks-input-message-input'
                onKeyDown={handleKeyDown}
            />
            <Button
                type="submit"
                disabled={disabled}
                appearance="primary"
                className='pcf-sample-hooks-button-message-input'
                icon={<SendFilled />}
                onClick={handleClick}
            >
                Enviar
            </Button>
        </div>
    );
};

export default React.memo(MessageInput);