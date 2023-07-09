import express from "express";
import http from "node:http";
import cors from "cors";

import { Server } from "socket.io";

import dotenv from "dotenv";
dotenv.config();

import { MessageType } from "./types/MessageType";
import { MessageResponseType } from "./types/MessageResponse";
import { formatTime } from "./utils/dates";

import { rooms } from "./variables/rooms";
import { router } from "./router";
import { verifyTokenJWT } from "./middlewares/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { getUser, getUserNameAndColor } from "./variables/users";
import { usersConnections } from "./variables/usersConnections";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log(`user connected: ${socket.id}`);

  // const sockets = (await io.fetchSockets()).map((socket) => socket.id);

  socket.on("select_room", async (data) => {
    // Ao entrar na sala, deve-se informar ao usuário todos que estão online ali

    socket.join(data.roomId);

    usersConnections[socket.id.toString()] = data.userId;

    const usersOnlineReturn: {
      [key: string]: {};
    } = {};

    const usersOnline = (await io.in(data.roomId).fetchSockets()).map(
      (conn) => {
        const userId = usersConnections[conn.id];
        usersOnlineReturn[conn.id.toString()] = getUser(userId);
      }
    );

    // console.log(sockets);
    // console.log(rooms[data]);
    //Enviando lista de usuários online assim que o usuário entrar
    console.log(usersOnlineReturn);
    io.to(socket.id).emit("previous_state_room", {
      usersOnline: usersOnlineReturn,
      messages: rooms[data.roomId].messages,
    });

    const returnUser = getUser(data.userId);

    io.to(data.roomId).emit("new_connection", {
      connection: socket.id,
      user: returnUser,
    });
  });

  socket.on(
    "message",
    async (idToken: string, message: Omit<MessageType, "id">) => {
      try {
        // Autenticando usuário
        const idUserDecoded = verifyTokenJWT(idToken) as JwtPayload & {
          userId: string;
        };
        // const idUserDecoded = "ID_FLAMENGO_SEXO";

        const date = new Date();

        const userNameAndColor = getUserNameAndColor(idUserDecoded.userId);
        // Adicionando à mensagem a informação de quando ela foi enviada
        const messageResponse: MessageResponseType = {
          content: message.content,
          date: formatTime(date),
          userId: idUserDecoded.userId,
          roomId: message.roomId,
          userName: userNameAndColor.userName!,
          color: userNameAndColor.color!,
        };

        // Encontrando a sala para adicionar a mensagem nela
        const room = rooms.find((room) => room.id === message.roomId);

        if (room) {
          room.messages = [...room?.messages, messageResponse];
        }

        // Enviando a mensagem para todos os participantes da sala
        io.to(message.roomId).emit("message-response", room?.messages);
        const users = (await io.in(message.roomId).fetchSockets()).map((conn) =>
          console.log(conn.id)
        );

        console.log("MENSAGENS DA SALA: ");
        room?.messages.forEach((message: MessageResponseType) =>
          console.log(message)
        );

        // const idUserDecoded = verifyTokenJWT(idToken);
      } catch (err) {
        return "Usuário não autenticado";
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
    delete usersConnections[socket.id];
  });
});

server.listen(3001, () => {
  console.log("Server Running on port 3001");
});
