import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";
import { MessageType } from "../../types/Message";

import React from "react";

interface MessageProps {
  message: MessageType;
}

export const Message = React.memo((props: MessageProps) => {
  return (
    <div className="message-box flex items-center gap-x-4 mb-8 p-4 rounded-lg last:mb-0 hover:bg-neutral-950 hover:transition hover:duration-150 hover:cursor-pointer">
      <div className="image self-start">
        <Stack direction="row" spacing={4}>
          <Avatar src={"https://github.com/jovijovi-john.png"}>
            <AvatarBadge boxSize="1.25em" bg="gray.300" />
          </Avatar>
        </Stack>
      </div>
      <div className="message-content">
        <div className="message-header flex gap-x-2 items-center">
          <div className="message-username font-bold text-red-600">
            Cachorro
          </div>

          <div className="message-date text-sm text-gray-400">
            <small>{props.message.date}</small>
          </div>
        </div>

        <div className="message-body break-all text-gray-200">
          {props.message.content}
        </div>
      </div>
    </div>
  );
});
