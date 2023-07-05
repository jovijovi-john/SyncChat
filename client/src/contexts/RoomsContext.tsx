import { useState, createContext, ReactNode } from "react";
import { RoomType } from "../types/Room";

interface RoomsContextProps {
  rooms: RoomType[] | [];
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
}

export const RoomsContext = createContext<RoomsContextProps>(
  {} as RoomsContextProps
);

function RoomsProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export default RoomsProvider;
