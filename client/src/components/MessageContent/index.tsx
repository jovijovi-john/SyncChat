import { useState } from "react";
import { MessageTypeResponse } from "../../types/MessageResponse";

type MessageContentProps = {
  message: MessageTypeResponse;
};

export function MessageContent({ message }: MessageContentProps) {
  const colors_array = {
    red: "#ef4444",
    orange: "#f97316",
    amber: "#f59e0b",
    yellow: "#eab308",
    yellow2: "#fcd04c",
    lime: "#84cc16",
    green: "#22c55e",
    emerald: "#10b981",
    teal: "#14b8a6",
    aquaGreen: "#01cfad",
    cyan: "#06b6d4",
    sky: "#0ea5e9",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
    fuchsia: "#d946ef",
    pink: "#ec4899",
    rose: "#f43f5e",
    white: "#ffffff",
  };

  function handleRandomColor() {
    const keys = Object.keys(colors_array);
    const key_aleatoria = keys[
      Math.floor(Math.random() * keys.length)
    ] as keyof typeof colors_array;

    return colors_array[key_aleatoria];
  }

  return (
    <div className="message-content overflow-hidden w-full">
      <div className="message-header flex gap-x-2 items-center">
        <div
          className={`message-username font-bold  hover:cursor-pointer`}
          style={{ color: handleRandomColor() }}
        >
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
