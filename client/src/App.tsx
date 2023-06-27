import { useState } from "react";
import Chat from "./pages/Chat";

import io from "socket.io-client";

import "./index.css";
import MessageForm from "./MessageForm";
import { Input, Button } from "@chakra-ui/react";

export const socketClient = io(`ws://localhost:3001`, {
  transports: ["websocket"],
});

function App() {
  const [message, setMessage] = useState("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanMessage: string = message.trim();

    if (cleanMessage.length != 0) {
      const messageObj = {
        content: cleanMessage,
      };

      socketClient.emit("message", messageObj);

      setMessage("");
    }
  };

  return (
    <div className="bg-neutral-900 w-full p-8">
      <MessageForm
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
      <Chat />
    </div>
  );
}

export default App;
