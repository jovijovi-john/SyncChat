import { useContext, useEffect } from "react";
import RoomsProvider, { RoomsContext } from "../../contexts/RoomsContext";
import { Conversations } from "../Conversations";
import { HeaderConversations } from "../HeaderConversations";
import { UserContext } from "../../contexts/UserContext";
import { getAuthToken, getUser } from "../../services/authService";
import { UserType } from "../../types/User";
import { RoomContext } from "../../contexts/RoomContext";

export function SidebarConversations() {
  const { setUser, setToken } = useContext(UserContext);
  const { roomContentVisible } = useContext(RoomContext);

  useEffect(() => {
    const userStored = getUser();
    const token = getAuthToken();

    if (userStored && token) {
      setUser(userStored);
      setToken(token);
    }
  }, [setUser, setToken]);

  return (
    <aside
      className={`
      flex
      ${roomContentVisible ? `max-md:hidden` : ""}
      sticky 
      top-0 
      left-0 
      h-full 
      w-full 
      border-r 
      border-zinc-700 
      text-black 
      flex-col 
      bg-zinc-800 
      overflow-y-hidden`}
    >
      <RoomsProvider>
        <HeaderConversations />
        <Conversations />
      </RoomsProvider>
    </aside>
  );
}
