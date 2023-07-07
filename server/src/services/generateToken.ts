import jwt from "jsonwebtoken";
import { UserType } from "../types/User";

const generateToken = (user: UserType): string => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });
  return token;
};

export { generateToken };
