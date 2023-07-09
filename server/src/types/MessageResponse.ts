import { UserType } from "./User";

export type MessageResponseType = {
  file?: string | null;
  content: string;
  date: string;
  user: UserType;
  roomId: string;
};
