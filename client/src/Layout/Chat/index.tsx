import MessageForm from "../../components/MessageForm";
import { HeaderChat } from "../../components/HeaderChat";
import { ChatMessages } from "../../components/ChatMessages";

import { useContext, useEffect } from "react";
import { RoomContext } from "../../contexts/RoomContext";

import "./styles.css";

interface ChatProps {
  avatar: string;
  nameRoom: string;
}

export default function Chat({ avatar, nameRoom }: ChatProps) {
  const { setAvatar, setRoomName } = useContext(RoomContext);

  useEffect(() => {
    setAvatar(avatar);
    setRoomName(nameRoom);
  }, []);

  return (
    <div className="flex-1 flex justify-between flex-col h-full bg-zinc-800 overflow-y-hidden relative ">
      <HeaderChat />

      <ChatMessages />

      <MessageForm className="flex sticky z-10 bottom-0 left-0 flex-1 gap-2 items-center justify-between pt-4 pb-4 px-8 " />
    </div>
  );
}
