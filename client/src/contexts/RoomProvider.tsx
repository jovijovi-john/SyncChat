import { useState, createContext, ReactNode } from "react";

interface UserContextProps {
  users: [];
  setUsers: React.Dispatch<React.SetStateAction<[]>>;
  messages: [];
  setMessages: React.Dispatch<React.SetStateAction<[]>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers, messages, setMessages }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
