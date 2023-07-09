import bcrypt from "bcrypt";

import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { generateToken } from "../../services/generateToken";

import { users } from "../../variables/users";
import { UserType } from "../../types/User";

const createUser = async (req: Request, res: Response) => {
  const { userName, password, color, avatar } = req.body;

  try {
    // Verificar se já existe um usuário com o mesmo nome
    const existingUser = users.find((user) => user.userName === userName);
    if (existingUser) {
      return res.status(400).send({ message: "Usuário já existe." });
    }

    // Gerar um hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const user: UserType = {
      id: uuid(),
      userName,
      avatar,
      password: hashedPassword,
      color: color,
    };

    // Adicionar o usuário ao array
    users.push(user);

    // Gerar o token de autenticação
    const token = generateToken(user);

    return res.status(201).json({
      user: {
        id: user.id,
        userName: user.userName,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).send({ message: "Erro ao criar usuário." });
  }
};

export { createUser };
