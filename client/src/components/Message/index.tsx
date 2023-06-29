import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";
import { MessageType } from "../../types/Message";
import "./styles.css";
import React from "react";
import { MessageContent } from "../MessageContent";

interface MessageProps {
  message: MessageType;
}

export const Message = React.memo(({ message }: MessageProps) => {
  return (
    <div className="message-box flex items-center gap-x-4 p-4 pl-8 last:mb-0 hover:bg-zinc-900 hover:transition hover:duration-150 ">
      <div className="image self-start">
        <Stack direction="row" className="hover:cursor-pointer" spacing={4}>
          <Avatar src={"https://github.com/jovijovi-john.png"} size={"sm"}>
            <AvatarBadge boxSize="1.25em" bg="green.300" />
          </Avatar>
        </Stack>
      </div>
      <MessageContent message={message} />
    </div>
  );
});
