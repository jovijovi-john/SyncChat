import Chat from "../../Layout/Chat";
import { RoomStatus } from "../../components/RoomStatus";
import { SidebarConversations } from "../../components/SideBarConversations";

export default function WebChat() {
  return (
    <div className="h-screen w-full red">
      <div className="gridLayout w-full h-screen relative">
        <SidebarConversations />
        <Chat className="flex-1 flex justify-between flex-col h-full  bg-zinc-800 overflow-y-hidden relative " />
        <RoomStatus />
      </div>
    </div>
  );
}
