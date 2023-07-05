import io from "socket.io-client";

export const socketClient = io(`https://syncchatv2.onrender.com/`, {
  transports: ["websocket"],
});
