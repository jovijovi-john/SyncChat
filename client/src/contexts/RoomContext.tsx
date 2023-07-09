import { useState, createContext, ReactNode } from "react";
import { MessageTypeResponse } from "../types/MessageResponse";
import { UserType } from "../types/User";

interface RoomContextProps {
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  users: HashMap;
  setUsers: React.Dispatch<React.SetStateAction<HashMap>>;
  messages: MessageTypeResponse[];
  setMessages: React.Dispatch<React.SetStateAction<MessageTypeResponse[]>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  roomContentVisible: boolean;
  setRoomContentVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HashMap {
  [key: string]: UserType;
}

export const RoomContext = createContext<RoomContextProps>(
  {} as RoomContextProps
);

interface RoomProviderProps {
  children: ReactNode;
}

function RoomProvider({ children }: RoomProviderProps) {
  const [avatar, setAvatar] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [users, setUsers] = useState<HashMap>({});
  const [messages, setMessages] = useState<MessageTypeResponse[]>([]);
  const [roomContentVisible, setRoomContentVisible] = useState<boolean>(false);

  return (
    <RoomContext.Provider
      value={{
        roomId,
        setRoomId,
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
