import { useState, createContext, ReactNode } from "react";
import { MessageTypeResponse } from "../types/MessageResponse";

interface RoomContextProps {
  idRoom: string;
  setIdRoom: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  messages: MessageTypeResponse[];
  setMessages: React.Dispatch<React.SetStateAction<MessageTypeResponse[]>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  roomContentVisible: boolean;
  setRoomContentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RoomContext = createContext<RoomContextProps>(
  {} as RoomContextProps
);

interface RoomProviderProps {
  children: ReactNode;
}

function RoomProvider({ children }: RoomProviderProps) {
  const [avatar, setAvatar] = useState<string>("");
  const [idRoom, setIdRoom] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageTypeResponse[]>([]);
  const [roomContentVisible, setRoomContentVisible] = useState<boolean>(false);

  return (
    <RoomContext.Provider
      value={{
        idRoom,
        setIdRoom,
        avatar,
        setAvatar,
        users,
        setUsers,
        messages,
        setMessages,
        roomName,
        setRoomName,
        roomContentVisible,
        setRoomContentVisible,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
