import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import { socketClient } from "../../services/socket";
import "./styles.css";

export function RoomStatus() {
  const { users, setUsers, setMessages } = useContext(RoomContext);

  useEffect(() => {
    entrarNaSala();

    socketClient.on("previous_state_room", (data) => {
      // console.log(data.sockets);
      // console.log(data.messages);

      setUsers(data.sockets);
      setMessages(data.messages);
    });

    socketClient.on("new_connection", (data) => {
      console.log(`Nova conexão ${data}`);
      setUsers((users) => [...users, data.sockets]);
    });

    return () => {
      socketClient.off("previous_state_room");
      socketClient.off("new_connection");
    };
  }, []);

  function entrarNaSala() {
    socketClient.emit("select_room", "qualquer ocoisa");
  }

  return (
    <aside className="sticky top-0 right-0 h-full overflow-y-scroll  border-l-2 border-zinc-500 bg-zinc-700 pt-12 text-white flex flex-col">
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
