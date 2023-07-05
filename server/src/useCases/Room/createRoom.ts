import { Request, Response } from "express";
import { rooms } from "../../variables/rooms";
import { RoomType } from "../../types/RoomType";

export function createRoom(req: Request, res: Response) {
  console.log(req.body);

  const { roomName, avatar } = req.body;

  const newRoom: RoomType = {
    id: (Number(rooms[rooms.length - 1].id) + 1).toString(),
    roomName,
    avatar,
    messages: [],
  };

  rooms.push(newRoom);

  res.send("Flamengo");
}
