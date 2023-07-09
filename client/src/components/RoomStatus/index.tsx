import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";
import { useContext, useEffect } from "react";
import { RoomContext } from "../../contexts/RoomContext";

import "./styles.css";

export function RoomStatus() {
  const { users } = useContext(RoomContext);

  useEffect(() => {
    console.log("dentro de RoomStatus");
    console.log(Object.entries(users));
  }, []);

  return (
    <aside className="max-2xl:hidden sticky top-0 right-0 h-full overflow-y-scroll border-l border-zinc-600 bg-zinc-700 pt-12 text-white flex flex-col">
      <div className="users-online">
        <span className="uppercase ml-3 text-xs text-zinc-400 font-medium tracking-wide">
          online - {Object.entries(users).length}
        </span>
        <ul className="">
          {Object.keys(users).map((key) => (
            <li key={key}>
              {
                <BoxAvatarLeftContentRight
                  cursor={"pointer"}
                  avatar={users[key].avatar!}
                >
                  <div
                    className="text-base"
                    style={{ color: users[key].color }}
                  >
                    {users[key].userName}
                  </div>
                </BoxAvatarLeftContentRight>
              }
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
