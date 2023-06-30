import { useState, createContext, ReactNode } from "react";
import { MessageTypeResponse } from "../types/MessageResponse";

interface RoomContextProps {
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  messages: MessageTypeResponse[];
  setMessages: React.Dispatch<React.SetStateAction<MessageTypeResponse[]>>;
}

export const RoomContext = createContext<RoomContextProps>(
  {} as RoomContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function RoomProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageTypeResponse[]>([]);

  return (
    <RoomContext.Provider value={{ users, setUsers, messages, setMessages }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
