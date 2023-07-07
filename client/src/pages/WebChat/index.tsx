import { RoomContent } from "../../components/RoomContent";
import { SidebarConversations } from "../../components/SideBarConversations";

import RoomProvider from "../../contexts/RoomContext";

import "./styles.css";

export default function WebChat() {
  return (
    <div className="h-screen w-full">
      <div className="gridLayout w-full h-screen">
        <RoomProvider>
          <SidebarConversations />
          <RoomContent />
        </RoomProvider>
      </div>
    </div>
  );
}
