import { Request, Response } from "express";
import { rooms } from "../../variables/rooms";

export function getAllRooms(req: Request, res: Response) {
  res.send(rooms);
}
