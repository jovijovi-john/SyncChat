import { useContext, useEffect, useRef } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { RoomContext } from "../../contexts/RoomContext";
import { Message } from "../../components/Message";
import { socketClient } from "../../services/socket";
import "./styles.css";

export function ChatMessages() {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages, setUsers } = useContext(RoomContext);

  useEffect(() => {
    socketClient.on("previous_state_room", (data) => {
      console.log(data.sockets);
      console.log(data.messages);
      setUsers(data.sockets);
      setMessages(data.messages);
    });

    socketClient.on("new_connection", (data) => {
      console.log(`Nova conexão ${data}`);
      setUsers((users) => [...users, data.sockets]);
    });

    return () => {
      socketClient.off("previous_state_room");
      socketClient.off("new_connection");
    };
  }, []);

  useEffect(() => {
    socketClient.on("message-response", (data: MessageTypeResponse) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, [socketClient]);

  useEffect(() => {
    // Isso aqui é pra jogar o scroll pra baixo sempre que chegar uma nova mensagem / sempre que o array de mensagem for modificado
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
