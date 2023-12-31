import { useEffect, useContext } from "react";

import { RoomContext } from "../../contexts/RoomContext";
import { socketClient } from "../../services/socket";
import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

// import { useQuery } from "react-query";

import { RoomsContext } from "../../contexts/RoomsContext";
import connection from "../../configs/connection";
import { UserContext } from "../../contexts/UserContext";

export async function getRooms() {
  // get rooms
  return await fetch(`${connection.url_api}/rooms`);
}
export function Conversations() {
  const { user } = useContext(UserContext);
  const { setRoomName, setAvatar, roomId, setRoomId, setRoomContentVisible } =
    useContext(RoomContext);

  // const [rooms, setRooms] = useState<[]>([]);

  const { rooms, setRooms } = useContext(RoomsContext);

  // const { data } = useQuery(["users", rooms, getRooms]);

  useEffect(() => {
    getRooms()
      .then((response) => response.json())
      .then((data) => setRooms(data.reverse()));
  }, []);

  function handleClick(room: any) {
    setRoomName(room.roomName);
    setAvatar(room.avatar);
    setRoomContentVisible(true);

    // Se o usuário já estiver em uma sala, retire-o dessa sala antes de colocar na próxima
    if (roomId) {
      socketClient.emit("leave-room", roomId);
    }
    setRoomId(room.id);

    // Selecionando a sala escolhida
    socketClient.emit("select_room", { roomId: room.id, userId: user.id });
    console.log(room.id);
  }

  return (
    <div className=" flex flex-col gap-2 overflow-y-scroll py-2">
      {rooms.map((room: any, index) => (
        <BoxAvatarLeftContentRight
          key={index}
          avatar={room.avatar}
          classNamesAvatar={`pl-3 ${
            room.id === roomId ? "border-l-2 border-[#e94f5c]" : ""
          }`}
          cursor="pointer"
          onClick={() => handleClick(room)}
        >
          <div className="border-b border-zinc-700 pb-2 h-full flex flex-1 items-center justify-between mt-2">
            <span className="text-sm text-white">{room.roomName}</span>
            <span className="text-xs  text-zinc-300">Entrar na conversa</span>
          </div>
        </BoxAvatarLeftContentRight>
      ))}
    </div>
  );
}
