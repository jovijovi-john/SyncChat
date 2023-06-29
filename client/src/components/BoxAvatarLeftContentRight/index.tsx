import React from "react";
import { Avatar } from "@chakra-ui/react";

import "./styles.css";

interface Props {
  avatar: string;
  children: React.ReactNode | string;
  cursor?: string | "default";
}
export const BoxAvatarLeftContentRight = React.memo((props: Props) => {
  return (
    <div
      className={`boxAvatarLeftContentRight  message-box flex items-center gap-x-3 px-4 py-2 last:mb-0 hover:transition hover:duration-150 hover:cursor-${props.cursor}`}
    >
      <div className="image self-start">
        <Avatar src={props.avatar} size={"sm"} />
      </div>
      {props.children}
    </div>
  );
});
