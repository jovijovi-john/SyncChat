import { useEffect, useState } from "react";
import { socketClient } from "../../services/socket";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { Button } from "@chakra-ui/react";
import { BoxAvatarLeftContentRight } from "../BoxAvatarLeftContentRight";

export function RoomStatus() {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    entrarNaSala();

    socketClient.on("send_status_users", (data) => {
      setUsers(data);
    });

    return () => {
      socketClient.off("send_status_users");
    };
  }, []);

  function entrarNaSala() {
    socketClient.emit("select_room", "qualquer ocoisa");
  }

  return (
    <aside className="sticky top-0 right-0 h-full overflow-y-scroll  border-l-1 border-zinc-700 bg-zinc-700 text-white">
      <ul>
        {users?.map((user: any, index: number) => (
          <li key={index}>
            {
              <BoxAvatarLeftContentRight
                
                avatar={"https://github.com/jovijovi-john.png"}
              >
                {user}
              </BoxAvatarLeftContentRight>
            }
          </li>
        ))}
      </ul>
    </aside>
  );
}
