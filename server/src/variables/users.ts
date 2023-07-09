import { UserType } from "../types/User";

export const users: UserType[] = [];

export function getUserNameAndColor(id: string) {
  const user = users.find((user) => user.id === id);
  return { userName: user?.userName, color: user?.color };
}

export function getUser(id: string) {
  const user = users.find((user) => user.id === id);
  const userReturn = {
    userName: user?.userName,
    color: user?.color,
    avatar: user?.avatar,
  };
  return userReturn;
}
