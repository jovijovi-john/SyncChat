import { Router } from "express";

import { getAllRooms } from "./useCases/Room/getAllRooms";
import { createRoom } from "./useCases/Room/createRoom";
import { createUser } from "./useCases/User/createUser";
import { getAllUsers } from "./useCases/User/getAllUsers";

import { signIn } from "./useCases/Login/signIn";
import verifyToken from "./middlewares/verifyToken";

export const router = Router();

router.get("/rooms", verifyToken, getAllRooms);
router.post("/rooms", verifyToken, createRoom);

router.get("/users", verifyToken, getAllUsers);
router.post("/users", createUser);

router.post("/login", signIn);
