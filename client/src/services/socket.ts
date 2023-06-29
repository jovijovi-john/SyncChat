import io from "socket.io-client";

export const socketClient = io(`ws://localhost:3001`, {
  transports: ["websocket"],
});
