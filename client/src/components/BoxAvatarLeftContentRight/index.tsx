import { Avatar } from "@chakra-ui/react";

import "./styles.css";

interface Props {
  avatar: string;
  children: React.ReactNode | string;
}

export function BoxAvatarLeftContentRight(props: Props) {
  return (
    <div className="boxAvatarLeftContentRight message-box flex items-center gap-x-4 p-4 last:mb-0 hover:transition hover:duration-150 ">
      <div className="image self-start">
        <Avatar src={props.avatar} size={"sm"} />
      </div>
      {props.children}
    </div>
  );
}
