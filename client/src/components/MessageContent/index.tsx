import { useContext, useState } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";
import { UserContext } from "../../contexts/UserContext";

type MessageContentProps = {
  message: MessageTypeResponse;
};

export function MessageContent({ message }: MessageContentProps) {
  

  return (
    <div className="message-content overflow-hidden w-full">
      <div className="message-header flex gap-x-2 items-center">
        <div
          className={`message-username font-bold  hover:cursor-pointer`}
          style={{color: message.color}}
        >
          {message.userName}
        </div>

        <div className="message-date text-sm text-gray-400">
          <small>{message.date}</small>
        </div>
      </div>

      <div className="message-body breakWord  text-gray-200">
        {message.content}
      </div>
    </div>
  );
}
