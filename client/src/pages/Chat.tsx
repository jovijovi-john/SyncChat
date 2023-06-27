import { Message } from "../components/Message";

import { socketClient } from "../App";
import { useEffect, useState } from "react";
import { MessageType } from "../types/Message";

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socketClient.on("message-response", (data: MessageType) => {
      console.log("Recebi uma mensagem: " + data.content );
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, []);

  return (
    <div>
      {messages.map((message: MessageType, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
