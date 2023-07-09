import Chat from "../../Layout/Chat";
import { useContext, useEffect } from "react";
import { RoomStatus } from "../RoomStatus";
import { RoomContext } from "../../contexts/RoomContext";
import ChatSvg from "../../assets/chat_svg.svg";
import "./styles.css";
import { getUser } from "../../services/authService";

export function RoomContent() {
  const {
    avatar,
    roomName,
    roomContentVisible,
    setRoomContentVisible,
    setAvatar,
    setUsers,
    setMessages,
  } = useContext(RoomContext);

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Lógica a ser executada quando a tecla "Esc" for pressionada
        console.log("A tecla Esc foi pressionada!");

        if (roomContentVisible != false) {
          setRoomContentVisible(false);

          setAvatar("");
          setUsers({});
          setMessages([]);
        }
      }
    }

    const user = getUser();

    console.log(user);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [roomContentVisible, setRoomContentVisible]);

  return roomContentVisible ? (
    <div className=" flex 2xl:grid 2xl:grid-cols-[60fr_15fr] w-full overflow-y-hidden">
      <Chat avatar={avatar} nameRoom={roomName} />
      <RoomStatus />
    </div>
  ) : (
    <div className="hidden bg-zinc-800 sm:flex items-center justify-center border-b-4 border-[#e94f5c]">
      <img className="" src={ChatSvg} alt="" />
    </div>
  );
}
