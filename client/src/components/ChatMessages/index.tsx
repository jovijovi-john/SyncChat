import { useContext, useEffect, useRef, useState } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { RoomContext } from "../../contexts/RoomContext";
import { Message } from "../../components/Message";
import { socketClient } from "../../services/socket";
import "./styles.css";

export function ChatMessages() {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages } = useContext(RoomContext);

  useEffect(() => {
    socketClient.on("message-response", (data: MessageTypeResponse) => {
      console.log("contando");
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, [socketClient]);

  useEffect(() => {
    // Isso aqui é pra jogar o scroll pra baixo sempre que chegar uma nova mensagem
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="chatMessages overflow-y-scroll h-full max-w-screen-2xl"
      ref={chatMessagesRef}
    >
      {messages.map((message: MessageTypeResponse, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
