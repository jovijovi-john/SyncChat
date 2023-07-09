import io from "socket.io-client";
import connection from "../configs/connection";
import { getAuthToken } from "./authService";

export const socketClient = io(`${connection.url_api}`, {
  transports: ["websocket"],
});
