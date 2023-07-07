import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import { users } from "../../variables/users";
import { UserType } from "../../types/User";

export async function createUser(req: Request, res: Response) {
  const { userName, password } = req.body;

  // Se existir algum usuário com aquele userName
  const userExists = users.some((user) => user.userName === userName);

  if (userExists) {
    return res.status(400).json({ error: "UserName already exists" });
  }

  try {
    // Gerar um hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserType = {
      id: uuid(),
      userName,
      password: hashedPassword, // Armazenar o hash da senha
    };

    // Adicionando o usuário no array de usuários
    users.push(user);
    console.log(user);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}
