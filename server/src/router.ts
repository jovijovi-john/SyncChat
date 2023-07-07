import { Router } from "express";

import { getAllRooms } from "./useCases/Room/getAllRooms";
import { createRoom } from "./useCases/Room/createRoom";
import { createUser } from "./useCases/User/createUser";
import { getAllUsers } from "./useCases/User/getAllUsers";

import { signIn } from "./useCases/Login/signIn";

export const router = Router();

router.get("/rooms", getAllRooms);
router.post("/rooms", createRoom);

router.get("/users", getAllUsers);
router.post("/users", createUser);

router.post("/login", signIn);
