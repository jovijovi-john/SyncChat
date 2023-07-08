import { Request, Response } from "express";
import { users } from "../../variables/users";
import { UserType } from "../../types/User";

export function authenticateUser(req: Request, res: Response) {
  const idUser = req.userId;

  const user = users.find((u: UserType) => u.id === idUser);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  } else {
    return res.status(200).json({ user });
  }
}
