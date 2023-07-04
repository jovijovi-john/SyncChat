import express, { Router } from "express";
import { Server } from "socket.io";
import http from "node:http";
import cors from "cors";

import moment from "moment-timezone";
import { MessageType } from "./types/MessageType";
import { MessageResponseType } from "./types/MessageResponse";
import { RoomType } from "./types/RoomType";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http:localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// rotas

app.get("/", (req, res) => {
  console.log("flamengo");
  res.send("flamengo");
});

const rooms: RoomType[] = [
  {
    id: "0",
    roomName: "Sala de Alg 1",
    avatar: "https://github.com/jovijovi-john.png",
    messages: [],
  },
  {
    id: "1",
    roomName: "Sala de Alg 2",
    avatar: "https://github.com/joodavi.png",
    messages: [],
  },
  {
    id: "2",
    roomName: "Sala de Alg 3",
    avatar: "https://github.com/pvborgesz.png",
    messages: [],
  },
  {
    id: "3",
    roomName: "Sala de Alg 4",
    avatar: "https://github.com/rayannesilveira.png",
    messages: [],
  },
  {
    id: "4",
    roomName: "Sala de Alg 5",
    avatar: "https://github.com/andre-fil.png",
    messages: [],
  },
  {
    id: "5",
    roomName: "Sala de Alg 6",
    avatar: "https://github.com/lukasdias.png",
    messages: [],
  },
  {
    id: "6",
    roomName: "Sala de Alg 6",
    avatar: "https://github.com/j0zeh.png",
    messages: [],
  },
  {
    id: "7",
    roomName: "Sala de Alg 7",
    avatar: "https://github.com/wmikael.png",
    messages: [],
  },
  {
    id: "8",
    roomName: "Sala de Alg 8",
    avatar: "https://github.com/danielmoreirapinto.png",
    messages: [],
  },
  {
    id: "9",
    roomName: "Sala de Alg 9",
    avatar: "https://github.com/gabrielbelodev.png",
    messages: [],
  },
  {
    id: "10",
    roomName: "Sala de Alg 10",
    avatar: "https://github.com/maateusilva.png",
    messages: [],
  },
  {
    id: "11",
    roomName: "Sala de Alg 11",
    avatar: "https://github.com/filipedeschamps.png",
    messages: [],
  },
  {
    id: "12",
    roomName: "Sala de Alg 12",
    avatar: "https://github.com/rafaballerini.png",
    messages: [],
  },
  {
    id: "13",
    roomName: "Sala de Alg 13",
    avatar: "https://github.com/luigidovera.png",
    messages: [],
  },
  {
    id: "14",
    roomName: "Sala de Alg 14",
    avatar: "https://github.com/arthurpassos16.png",
    messages: [],
  },
  {
    id: "15",
    roomName: "Sala de Alg 15",
    avatar: "https://github.com/IA-V.png",
    messages: [],
  },
];

app.get("/rooms", (req, res) => {
  res.send(rooms);
});

//

function formatTime(date: Date) {
  const momentDate = moment(date).tz("America/Sao_Paulo");

  let hours: number | string = momentDate.hours();
  let minutes: number | string = momentDate.minutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes;

  const today = moment().tz("America/Sao_Paulo");
  const yesterday = moment(today).subtract(1, "days");

  if (momentDate.isSame(today, "day")) {
    return "Hoje às " + strTime;
  } else if (momentDate.isSame(yesterday, "day")) {
    return "Ontem às " + strTime;
  } else {
    return momentDate.format("DD [de] MMM [de] YYYY [às] HH:mm");
  }
}

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

    // Antes de emitir a mensagem, deve salvá-la no banco de dados. Quando isso acontecer, ai devolve a mensagem para todos
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
