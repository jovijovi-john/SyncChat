import { RoomContent } from "../../components/RoomContent";
import { SidebarConversations } from "../../components/SideBarConversations";

import RoomProvider from "../../contexts/RoomContext";
import UserProvider from "../../contexts/UserContext";

import "./styles.css";

export default function WebChat() {
  return (
    <div className="h-screen w-full">
      <div className="flex md:grid md:grid-cols-[350px_1fr] xl:grid-cols-[minmax(400px, 20fr)_85fr] w-full h-screen">
        <RoomProvider>
          <UserProvider>
            <SidebarConversations />
            <RoomContent />
          </UserProvider>
        </RoomProvider>
      </div>
    </div>
  );
}
