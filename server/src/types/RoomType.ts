import { MessageResponseType } from "./MessageResponse";

export type RoomType = {
  id: string;
  roomName: string;
  avatar: string;
  messages: MessageResponseType[] | [];
};
