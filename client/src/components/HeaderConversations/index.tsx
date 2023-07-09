import { useContext } from "react";
import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

import ModalCreateRoom from "../ModalCreateRoom";
import { UserContext } from "../../contexts/UserContext";

export function HeaderConversations() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-zinc-800  w-full border-b border-zinc-700">
      <BoxAvatarLeftContentRight avatar={user.avatar!} size="md">
        <div className="flex justify-between flex-1 items-center">
          <div className="flex flex-col ">
            <span className="font-medium text-zinc-200">{user.userName}</span>
            <small className="text-zinc-400 font-medium">Online</small>
          </div>

          <ModalCreateRoom />
        </div>
      </BoxAvatarLeftContentRight>
    </div>
  );
}
