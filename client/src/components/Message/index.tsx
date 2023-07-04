import React from "react";

import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";
import { MessageContent } from "../MessageContent";
import { MessageTypeResponse } from "../../types/MessageResponse";

import "./styles.css";

interface MessageProps {
  message: MessageTypeResponse;
}

export const Message = React.memo(({ message }: MessageProps) => {
  return (
    <div className="message-box flex items-center gap-x-4 p-4 pl-8 last:mb-0 hover:transition hover:duration-150 ">
      <div className="image self-start">
        <Stack direction="row" className="hover:cursor-pointer" spacing={4}>
          <Avatar src={"https://github.com/andre-fil.png"} size={"sm"}>
            <AvatarBadge
              boxSize="1.25em"
              bg="green.300"
              borderColor="#282828"
              className="md:invisible md:hidden"
            />
          </Avatar>
        </Stack>
      </div>
      <MessageContent message={message} />
    </div>
  );
});
