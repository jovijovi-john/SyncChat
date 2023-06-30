import { Message } from "../../components/Message";

import { socketClient } from "../../services/socket";
import { useEffect, useState, useContext } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";

import "./styles.css";
import { RoomContext } from "../../contexts/RoomContext";

export function ChatMessages() {
  const { messages, setMessages } = useContext(RoomContext);

  useEffect(() => {
    socketClient.on("message-response", (data: MessageTypeResponse) => {
      console.log("Recebi uma mensagem: " + data.content);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, []);

  return (
    <div className="chatMessages overflow-y-scroll h-full max-w-screen-2xl">
      {messages.map((message: MessageTypeResponse, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
