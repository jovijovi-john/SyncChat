import bcrypt from "bcrypt";

import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { generateToken } from "../../services/generateToken";

interface UserType {
  id: string;
  userName: string;
  password: string;
  connection: string;
}

const users: UserType[] = []; // Array de usuários

const createUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    // Verificar se já existe um usuário com o mesmo nome
    const existingUser = users.find((user) => user.userName === userName);
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    // Gerar um hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const user: UserType = {
      id: uuid(),
      userName,
      password: hashedPassword,
      connection: "",
    };

    // Adicionar o usuário ao array
    users.push(user);

    // Gerar o token de autenticação
    const token = generateToken(user);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

export { createUser };
