import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import "./styles.css";

export function RoomStatus() {
  const { users } = useContext(RoomContext);

  return (
    <aside className="sticky top-0 right-0 h-full overflow-y-scroll  border-l border-zinc-600 bg-zinc-700 pt-12 text-white flex flex-col">
      <div className="users-online">
        <span className="uppercase ml-3 text-xs text-zinc-400 font-medium tracking-wide">
          online - {users?.length}
        </span>
        <ul className="">
          {users?.map((user: any, index: number) => (
            <li key={index}>
              {
                <BoxAvatarLeftContentRight
                  cursor={"pointer"}
                  avatar={"https://github.com/jovijovi-john.png"}
                >
                  <div className="text-base">{user}</div>
                </BoxAvatarLeftContentRight>
              }
            </li>
          ))}
        </ul>
      </div>

      <div className="users-offline mt-6">
        <span className="uppercase ml-3 text-xs text-zinc-400 font-medium tracking-wide">
          offline - {users?.length}
        </span>
        <ul className="opacity-20">
          {users?.map((user: any, index: number) => (
            <li key={index}>
              {
                <BoxAvatarLeftContentRight
                  cursor={"pointer"}
                  avatar={"https://github.com/jovijovi-john.png"}
                >
                  <div className="text-md">{user}</div>
                </BoxAvatarLeftContentRight>
              }
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
