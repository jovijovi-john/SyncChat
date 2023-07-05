import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

import { useEffect, useState, useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { socketClient } from "../../services/socket";

import { useQuery } from "react-query";

import { RoomsContext } from "../../contexts/RoomsContext";

export async function getRooms() {
  // get rooms
  return await fetch("http://localhost:3001/rooms");
}
export function Conversations() {
  const {
    roomName,
    setRoomName,
    users,
    setUsers,
    avatar,
    setAvatar,
    idRoom,
    setIdRoom,
    setRoomContentVisible,
  } = useContext(RoomContext);

  // const [rooms, setRooms] = useState<[]>([]);

  const { rooms, setRooms } = useContext(RoomsContext);

  // const { data,  } = useQuery(["users", rooms, getRooms]);

  useEffect(() => {
    getRooms()
      .then((response) => response.json())
      .then((data) => setRooms(data.reverse()));
  }, []);

  function handleClick(room: any) {
    setRoomName(room.roomName);
    setAvatar(room.avatar);
    setRoomContentVisible(true);
    setIdRoom(room.id);

    socketClient.emit("select_room", room.id);
    console.log(room.id);
  }

  return (
    <div className=" flex flex-col gap-2 overflow-y-scroll py-2">
      {rooms.map((room: any, index) => (
        <BoxAvatarLeftContentRight
          key={index}
          avatar={room.avatar}
          classNamesAvatar={`pl-3 ${
            room.id === idRoom ? "border-l-2 border-[#e94f5c]" : ""
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
