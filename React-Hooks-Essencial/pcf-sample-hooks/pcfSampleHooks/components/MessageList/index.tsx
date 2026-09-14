// MessageList.tsx
import React, { useMemo } from 'react';
import { IMessage } from '../../types/IMessage';
import { Badge, Caption1Stronger } from '@fluentui/react-components';
import './style.css';
interface MessageListProps {
    messages: IMessage[];
}

function MessageList(props: MessageListProps) {

    // O useMemo "lembra" do resultado desta função.
    // Ele só executará o código interno se o array [messages] mudar.
    const groupedMessages = useMemo(() => {
        console.log("%c [Cálculo Pesado] Agrupando mensagens...", "color: #ff9900");

        // Simulação de uma lógica: Agrupar mensagens por data
        const groups: { [key: string]: IMessage[] } = {};

        props.messages.forEach(msg => {
            const date = new Date(msg.id).toLocaleDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(msg);
        });

        return groups;
    }, [props.messages]); // 👈 Dependência crítica

    return (
        <div className="pcf-sample-hooks-message-list-container">
            {console.log("%c [Render] Renderizando MessageList...", "color: #00cc66")}
            {Object.keys(groupedMessages).map(date => (
                <div key={date} className="pcf-sample-hooks-message-list-message-group">
                    {groupedMessages[date].map(m => (
                        <Badge shape='circular' key={`${m.sender}-${m.id}`} appearance="filled" color={m.isBot ? "success" : "brand"}>
                            <Caption1Stronger>{date}</Caption1Stronger> -  {m.text}
                        </Badge>

                    ))}
                </div>
            ))}
        </div>
    );
};

export default MessageList;