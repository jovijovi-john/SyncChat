import express from "express";
import { Server } from "socket.io";
import http from "node:http";
import cors from "cors";

import moment from "moment-timezone";
import { MessageType } from "./types/MessageType";
import { MessageResponseType } from "./types/MessageResponse";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http:localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

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

let messages: MessageResponseType[] = [];

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("message", (data: MessageType) => {
    console.log(data);

    const date = new Date();

    const messageResponse: MessageResponseType = {
      content: data.content,
      date: formatTime(date),
    };

    io.emit("message-response", messageResponse);
    messages.push(messageResponse);
  });
});

server.listen(3001, () => {
  console.log("Server Running");
});
