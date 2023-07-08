import { Router } from "express";

import { getAllRooms } from "./useCases/Room/getAllRooms";
import { createRoom } from "./useCases/Room/createRoom";
import { createUser } from "./useCases/User/createUser";
import { getAllUsers } from "./useCases/User/getAllUsers";
import { authenticateUser } from "./useCases/Auth/authenticateUser";

import { signIn } from "./useCases/Login/signIn";
import verifyToken from "./middlewares/verifyToken";

export const router = Router();

// Aqui vai fazer o login e trazer um token
router.post("/login", signIn);

// Essa daqui vai ser pra proteger as páginas e saber se o token no cookie realmente é válido
router.post("/auth", verifyToken, authenticateUser);

router.get("/rooms", getAllRooms);
router.post("/rooms", verifyToken, createRoom);

router.get("/users", getAllUsers);
router.post("/users", createUser);
