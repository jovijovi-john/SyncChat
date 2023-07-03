import { Avatar } from "@chakra-ui/react";
import React from "react";
import "./styles.css";

interface Props {
  avatar: string;
  children: React.ReactNode | string;
  cursor?: string | "default";
  size?: string;
  classNameBox?: string;
  classNamesAvatar?: string;
}
export const BoxAvatarLeftContentRight = React.memo((props: Props) => {
  return (
    <div
      className={`boxAvatarLeftContentRight  message-box flex items-center gap-x-3 px-4 py-2 last:mb-0 hover:transition hover:duration-150 hover:cursor-${props.cursor} ${props.classNameBox}`}
    >
      <div className={`image self-start ${props.classNamesAvatar}`}>
        <Avatar src={props.avatar} size={props.size} />
      </div>

      {props.children}
    </div>
  );
});
