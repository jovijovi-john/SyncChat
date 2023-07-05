import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

import ModalCreateRoom from "../ModalCreateRoom";

export function HeaderConversations() {
  return (
    <div className="bg-zinc-800  w-full border-b border-zinc-700">
      <BoxAvatarLeftContentRight
        avatar="http://github.com/jovijovi-john.png"
        size="md"
      >
        <div className="flex justify-between flex-1 items-center">
          <div className="flex flex-col ">
            <span className="font-medium text-zinc-200">John</span>
            <small className="text-zinc-400 font-medium">Online</small>
          </div>

          <ModalCreateRoom />
        </div>
      </BoxAvatarLeftContentRight>
    </div>
  );
}
