import { Request, Response } from "express";
import { RoomType } from "../../types/RoomType";
import { rooms } from "../../variables/rooms";

export function getAllRooms(req: Request, res: Response) {
  res.send(rooms);
}
