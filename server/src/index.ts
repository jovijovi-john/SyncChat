import { Server } from "socket.io";

import express from "express";

import http from "node:http";
import cors from "cors";

import { MessageType } from "./types/MessageType";
import { MessageResponseType } from "./types/MessageResponse";
import { formatTime } from "./utils/dates";

import { rooms } from "./variables/rooms";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http:localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", async (socket) => {
  console.log(`user connected: ${socket.id}`);

  const sockets = (await io.fetchSockets()).map((socket) => socket.id);

  socket.broadcast.emit("new_connection", socket.id);

  socket.on("select_room", (data) => {
    // Ao entrar na sala, deve-se informar ao usuário todos que estão online ali
    socket.join(data);
    console.log(sockets);
    console.log(rooms[data]);
    //Enviando lista de usuários online assim que o usuário entrar
    io.to(socket.id).emit("previous_state_room", {
      sockets,
      messages: rooms[data].messages,
    });
  });

  socket.on("message", ({ content, idRoom, file }: MessageType) => {
    console.log("CHEGOU A MENSAGEM");
    console.log(idRoom);
    const date = new Date();

    // Adicionando à mensagem a informação de quando ela foi enviada
    const messageResponse: MessageResponseType = {
      content: content,
      date: formatTime(date),
    };

    const room = rooms.find((room) => room.id === idRoom);

    if (room) {
      room.messages = [...room?.messages, messageResponse];
      console.log;
    }

    io.to(idRoom).emit("message-response", messageResponse);

    console.log("MENSAGENS DA SALA: ");
    room?.messages.forEach((message: MessageResponseType) =>
      console.log(message)
    );
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server Running on port 3001");
});
