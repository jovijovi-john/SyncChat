import Chat from "../../Layout/Chat";
import { RoomStatus } from "../../components/RoomStatus";

import "./styles.css";

export function RoomContent() {
  return (
    <div className="gridBox w-full">
      <Chat className="flex-1 flex justify-between flex-col h-full bg-zinc-800 overflow-y-hidden relative " />
      <RoomStatus />
    </div>
  );
}
