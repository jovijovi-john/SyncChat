import { RoomStatus } from "../../components/RoomStatus";
import Chat from "../../Layout/Chat";
import RoomProvider from "../../contexts/RoomContext";
import "./styles.css";

export function RoomContent() {
  
  return (
    <RoomProvider>
      <div className="gridBox w-full overflow-y-hidden">
        <Chat />
        <RoomStatus />
      </div>
    </RoomProvider>
  );
}
