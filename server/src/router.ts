import { Router } from "express";

import { getAllRooms } from "./useCases/Room/getAllRooms";
import { createRoom } from "./useCases/Room/createRoom";

export const router = Router();

router.get("/rooms", getAllRooms);
router.post("/rooms", createRoom);