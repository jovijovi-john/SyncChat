import Chat from "../../Layout/Chat";
import { useContext, useEffect } from "react";
import { RoomStatus } from "../../components/RoomStatus";
import { RoomContext } from "../../contexts/RoomContext";
import ChatSvg from "../../assets/chat_svg.svg";
import "./styles.css";

export function RoomContent() {
  const { avatar, roomName, roomContentVisible, setRoomContentVisible } =
    useContext(RoomContext);

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Lógica a ser executada quando a tecla "Esc" for pressionada
        console.log("A tecla Esc foi pressionada!");

        if (roomContentVisible != false) {
          setRoomContentVisible(false);
        }
      }
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [roomContentVisible, setRoomContentVisible]);

  return roomContentVisible ? (
    <div className="gridBox w-full overflow-y-hidden">
      <Chat avatar={avatar} nameRoom={roomName} />
      <RoomStatus />
    </div>
  ) : (
    <div className="bgImage flex items-center justify-center border-b-4 border-[#e94f5c]">
      <img className="" src={ChatSvg} alt="" />
    </div>
  );
}
