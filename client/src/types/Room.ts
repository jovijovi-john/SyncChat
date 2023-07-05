import { MessageTypeResponse } from "./MessageResponse";
import { UserType } from "./User";

export type RoomType = {
  id: string;
  icon: string | "";
  name: string;
  users: UserType[] | [];
  messages: MessageTypeResponse[] | [];
};
