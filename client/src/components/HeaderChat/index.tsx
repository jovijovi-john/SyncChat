import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";

import "./styles.css";

export function HeaderChat() {
  const { avatar, users, roomName } = useContext(RoomContext);

  function handleNameUsers() {
    const userNames = users.map((user) => user);
    return userNames.join(", ");
  }

  return (
    <BoxAvatarLeftContentRight
      avatar={avatar}
      size={"md"}
      classNameBox="headerRoom sticky z-20"
    >
      <div className="flex flex-col">
        <span className="font-bold text-zinc-200">{roomName}</span>
        <small className="text-zinc-400">{handleNameUsers()}</small>
      </div>
    </BoxAvatarLeftContentRight>
  );
}
