import { RoomContent } from "../../components/RoomContent";
import { SidebarConversations } from "../../components/SideBarConversations";

import "./styles.css";

export default function WebChat() {
  return (
    <div className="h-screen w-full red">
      <div className="gridLayout w-full h-screen relative">
        <SidebarConversations />
        <RoomContent />
      </div>
    </div>
  );
}
