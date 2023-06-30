import { useEffect, useState } from "react";
import { socketClient } from "../../services/socket";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { Button } from "@chakra-ui/react";
import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

import "./styles.css";

export function RoomStatus() {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    entrarNaSala();

    socketClient.on("previous_state_room", (data) => {
      setUsers(data.sockets);
    });

    socketClient.on("new_connection", (data) => {
      console.log(`Nova conexão ${data}`);
      setUsers((users: any) => [...users, data]);
    });

    return () => {
      socketClient.off("initial_users_online");
      socketClient.off("new_connection");
    };
  }, []);

  function entrarNaSala() {
    socketClient.emit("select_room", "qualquer ocoisa");
  }

  return (
    <aside className="sticky top-0 right-0 h-full overflow-y-scroll  border-l-1 border-zinc-700 bg-zinc-700 pt-12 text-white flex flex-col">
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
