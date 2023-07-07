import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Adicione a propriedade userId ao objeto Request
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  try {
    // precisa do token e da chave secreta no verify, o decoded guardará o id do usuario caso de certo.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId: string };

    req.userId = decoded.userId; // Armazena o ID do usuário no objeto de solicitação para uso posterior
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }
};

export default verifyToken;
