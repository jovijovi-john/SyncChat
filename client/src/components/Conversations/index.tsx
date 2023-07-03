import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

import { useEffect } from "react";

export function Conversations() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <div className=" flex flex-col gap-2 overflow-y-scroll pl-3 py-2">
      {array.map((numero) => (
        <BoxAvatarLeftContentRight
          key={numero}
          avatar="https://github.com/andre-fil.png"
        >
          <div className="border-b border-zinc-700 pb-2 h-full flex flex-1 items-center justify-between mt-2">
            <span className="text-sm text-white">Sala {numero}</span>
            <span className="text-xs  text-zinc-300">Entrar na conversa</span>
          </div>
        </BoxAvatarLeftContentRight>
      ))}
    </div>
  );
}
