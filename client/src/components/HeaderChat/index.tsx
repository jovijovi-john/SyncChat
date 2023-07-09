import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";

import { BiArrowBack } from "react-icons/bi";

import "./styles.css";

export function HeaderChat() {
  const { avatar, users, roomName, setRoomContentVisible } =
    useContext(RoomContext);

  function handleNameUsers() {
    console.log(users);
    const userNames = Object.keys(users).map((key) => users[key].userName);
    return userNames.join(", ");
  }

  return (
    <div className="flex w-full">
      <button
        onClick={() => setRoomContentVisible(false)}
        className="hidden max-md:flex max-md:items-center mx-4"
      >
        <BiArrowBack color={"#999999"} size={25} />
      </button>
      <BoxAvatarLeftContentRight
        avatar={avatar}
        size={"md"}
        classNameBox="headerRoom max-md:ml-[-25px] sticky z-20"
      >
        <div className="flex flex-col">
          <span className="font-bold text-zinc-200">{roomName}</span>
          <small className="text-zinc-400">{handleNameUsers()}</small>
        </div>
      </BoxAvatarLeftContentRight>
    </div>
  );
}
