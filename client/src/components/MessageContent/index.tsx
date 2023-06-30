import { MessageTypeResponse } from "../../types/MessageResponse";

type MessageContentProps = {
  message: MessageTypeResponse;
};

export function MessageContent({ message }: MessageContentProps) {
  return (
    <div className="message-content overflow-hidden w-full">
      <div className="message-header flex gap-x-2 items-center">
        <div className="message-username font-bold text-white hover:cursor-pointer">
          Cachorro
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
