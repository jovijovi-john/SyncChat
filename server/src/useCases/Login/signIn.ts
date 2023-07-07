import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { users } from "../../variables/users";
import { generateToken } from "../../services/generateToken";

export async function signIn(req: Request, res: Response) {
  const { userName, password } = req.body;

  try {
    // Verificar se o usuário existe no array de usuários
    const user = users.find((u) => u.userName === userName);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gerar o token de autenticação
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ message: "Erro durante o login." });
  }
}
