import { Request, Response } from "express";
import { users } from "../../variables/users";

export function getAllUsers(req: Request, res: Response) {
  res.send(users);
}
