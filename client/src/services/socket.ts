import io from "socket.io-client";
import connection from "../configs/connection";

export const socketClient = io(`${connection.url_api}`, {
  transports: ["websocket"],
});
