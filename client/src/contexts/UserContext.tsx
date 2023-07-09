import { useState, createContext, ReactNode } from "react";
import { UserType } from "../types/User";

interface UserContextProps {
  user: UserType;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [token, setToken] = useState<string>("");

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
