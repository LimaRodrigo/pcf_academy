import { Badge, Divider } from "@fluentui/react-components";
import React, { useCallback, useState } from "react";
import { IMessage } from "../../types/IMessage";
import MessageInput from "../../components/MessageInput";
import "./style.css";
import MessageList from "../../components/MessageList";


function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // ❌ SEM useCallback: Esta função seria RE-CRIADA a cada renderização.
  // Isso faria com que o MessageInput (que é React.memo) re-renderize, mesmo que o isTyping mude.
  // ✅ COM useCallback: A função é MEMORIZADA. Ela só será recriada
  // se as dependências no array ([messages]) mudarem.
  //https://pt-br.react.dev/reference/react/useCallback
  const handleSendMessage = useCallback((messageText: string): void => {
    setMessages((prevMessages) => [
      ...prevMessages, // spread operator para manter mensagens anteriores
      { id: Date.now(), text: messageText, sender: 'user' },
    ]);
    // Simular que o status de digitação muda, o que causa re-renderização do Chat
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prevMessages) => [
        ...prevMessages, // spread operator para manter mensagens anteriores
        { id: Date.now(), text: "Olá! Sou o assistente, como posso ajudar?", sender: 'bot', isBot: true },
      ]);
    }, 2000);

  }, []);

  return (
    <div className="pcf-sample-hooks-container-chat-page">
      {console.log("%c [Render] Renderizando ChatPage...", "color: #00cc66")}

      <div>
        <Divider alignContent="center" >
          CHAT PAGE
        </Divider>
      </div>
      <div>
        <MessageList messages={messages} />

      </div>
      <div className="pcf-sample-hooks-message-input-chat-page">


        <Badge shape="rounded" appearance="filled" color="success">
          {isTyping ? 'Bot digitando...' : 'Ocioso'}
        </Badge>
        <MessageInput
          onSendMessage={handleSendMessage} // Passando a função memorizada
          disabled={isTyping}
        />

      </div>
    </div>
  );
}
// Exportando o componente ChatPage memorizado para evitar re-renders desnecessários
//https://pt-br.react.dev/reference/react/memo
export default React.memo(ChatPage);