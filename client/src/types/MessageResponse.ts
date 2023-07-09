import { UserType } from "./User";

export type MessageTypeResponse = {
  file: string | null;
  user: UserType;
  roomId: string;
  content: string;
  date: string;
};
