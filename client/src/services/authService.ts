import Cookies from "js-cookie";
import { UserType } from "../types/User";

const TOKEN_COOKIE_NAME = "token";
const USER_COOKIE_NAME = "user-syncchat";
const COOKIE_EXPIRATION_DAYS = 7; // tempo de disponibilidade do cookie

function getExpirationDate() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS);
  return expirationDate;
}

export function setAuthToken(token: string): void {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: getExpirationDate() });
}

export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export function removeAuthToken(): void {
  Cookies.remove(TOKEN_COOKIE_NAME);
}

export function setUser(user: UserType): void {
  Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), {
    expires: getExpirationDate(),
  });
}

export function getUser(): UserType | undefined {
  const userString = Cookies.get(USER_COOKIE_NAME);
  if (userString) {
    return JSON.parse(userString) as UserType;
  }
}

export function removeUser(): void {
  Cookies.remove(USER_COOKIE_NAME);
}
