import { useContext, useEffect, useRef } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { RoomContext } from "../../contexts/RoomContext";
import { Message } from "../../components/Message";
import { socketClient } from "../../services/socket";
import "./styles.css";

export function ChatMessages() {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const { messages, setMessages, users, setUsers, roomId } =
    useContext(RoomContext);

  useEffect(() => {
    socketClient.on("previous_state_room", (data) => {
      setUsers(data.usersOnline);
      setMessages(data.messages);
    });

    socketClient.on("new_connection", (data) => {
      console.log(`Nova conexão ${data}`);
      console.log(users);
      setUsers((prevUsers) => {
        return { ...prevUsers, [data.connection]: data.user };
      });
      console.log(users);
    });

    return () => {
      socketClient.off("previous_state_room");
      socketClient.off("new_connection");
    };
  }, [socketClient]);

  useEffect(() => {
    socketClient.on("message-response", (data) => {
      // console.log(`${roomId}: ${data.roomId}`);
      setMessages(data);
    });

    return () => {
      socketClient.off("message-response");
    };
  }, [setMessages]);

  useEffect(() => {
    // Isso aqui é pra jogar o scroll pra baixo sempre que chegar uma nova mensagem / sempre que o array de mensagem for modificado
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;

      console.log(messages);
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
