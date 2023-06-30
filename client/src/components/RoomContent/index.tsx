import Chat from "../../Layout/Chat";
import { RoomStatus } from "../../components/RoomStatus";
import RoomProvider from "../../contexts/RoomContext";

import "./styles.css";

export function RoomContent() {
  return (
    <RoomProvider>
      <div className="gridBox w-full overflow-y-hidden">
        <Chat className="flex-1 flex justify-between flex-col h-full bg-zinc-800 overflow-y-hidden relative " />
        <RoomStatus />
      </div>
    </RoomProvider>
  );
}
