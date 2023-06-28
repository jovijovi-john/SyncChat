import { Message } from "../components/Message";

import { socketClient } from "../App";
import { useEffect, useState } from "react";
import { MessageType } from "../types/Message";

import MessageForm from "../components/MessageForm";

export default function Chat(props: React.HTMLAttributes<HTMLDivElement>) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi natus quis animi nisi ipsam? Autem esse saepe veniam ut nihil asperiores culpa ab molestias fugiat, vel quaerat doloremque, quia inventore. ",
      date: Date.now().toLocaleString("pt-BR"),
      file: null,
    },
  ]);

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
      <div className="chat overflow-y-scroll ">
        {messages.map((message: MessageType, index: number) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <MessageForm className="flex gap-2 max-w-screen-2xl items-center justify-between pt-4 px-8" />
    </div>
  );
}
