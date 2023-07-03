import { useState, createContext, ReactNode } from "react";
import { MessageTypeResponse } from "../types/MessageResponse";

interface RoomContextProps {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  messages: MessageTypeResponse[];
  setMessages: React.Dispatch<React.SetStateAction<MessageTypeResponse[]>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
}

export const RoomContext = createContext<RoomContextProps>(
  {} as RoomContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function RoomProvider({ children }: UserProviderProps) {
  const [avatar, setAvatar] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageTypeResponse[]>([]);

  return (
    <RoomContext.Provider
      value={{
        avatar,
        setAvatar,
        users,
        setUsers,
        messages,
        setMessages,
        roomName,
        setRoomName,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
