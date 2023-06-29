import { Message } from "../components/Message";

import { socketClient } from "../App";
import { useEffect, useState } from "react";
import { MessageType } from "../types/Message";
import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";

import MessageForm from "../components/MessageForm";

export default function Chat(props: React.HTMLAttributes<HTMLDivElement>) {
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
    <div {...props}>
      <div className="image sticky z-20 shadow-2xl bg-red-950 w-full self-start flex flex-1 border-b-1 border-b-zinc-900 py-2">
        <Stack
          direction="row"
          className="px-4 hover:cursor-pointer"
          spacing={4}
        >
          <Avatar src={"https://github.com/joodavi.png"} size={"md"} />
        </Stack>

        <div className="flex flex-col">
          <span className="font-bold text-zinc-200">
            SEXOOOOOOOOOO DE CAVALOS
          </span>
          <small className="text-zinc-400">
            João Davi, André broxa, Pv Safado, Gabriel_Transa
          </small>
        </div>
      </div>
      <div className="chat overflow-y-scroll h-full max-w-screen-2xl">
        {messages.map((message: MessageType, index: number) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <MessageForm className="flex sticky z-10 bg-zinc-800 bottom-0 left-0 flex-1 gap-2 max-w-screen-2xl items-center justify-between pt-4 pb-4 px-8" />
    </div>
  );
}
