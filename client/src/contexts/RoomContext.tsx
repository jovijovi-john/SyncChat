import { useState, createContext, ReactNode } from "react";

interface RoomContextProps {
  users: [];
  setUsers: React.Dispatch<React.SetStateAction<[]>>;
  messages: [];
  setMessages: React.Dispatch<React.SetStateAction<[]>>;
}

export const RoomContext = createContext<RoomContextProps>(
  {} as RoomContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function RoomProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);

  return (
    <RoomContext.Provider value={{ users, setUsers, messages, setMessages }}>
      {children}
    </RoomContext.Provider>
  );
}

export default RoomProvider;
