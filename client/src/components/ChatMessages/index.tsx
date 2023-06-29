import { Message } from "../../components/Message";

import { socketClient } from "../../App";
import { useEffect, useState } from "react";
import { MessageType } from "../../types/Message";

import "./styles.css";

export function ChatMessages() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socketClient.on("message-response", (data: MessageType) => {
      console.log("Recebi uma mensagem: " + data.content);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, []);

  return (
    <div className="chatMessages overflow-y-scroll h-full max-w-screen-2xl">
      {messages.map((message: MessageType, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
