import { UserType } from "../types/User";

const TOKEN_LOCAL_STORAGE_KEY = "token";
const USER_LOCAL_STORAGE_KEY = "user-syncchat";
const LOCAL_STORAGE_EXPIRATION_DAYS = 7; // tempo de disponibilidade do local storage em dias

function getExpirationDate() {
  const expirationDate = new Date();
  expirationDate.setDate(
    expirationDate.getDate() + LOCAL_STORAGE_EXPIRATION_DAYS
  );
  return expirationDate;
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
}

export function getAuthToken(): string | undefined {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) as string;
}

export function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export function setUser(user: UserType): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): UserType | undefined {
  const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (userString) {
    return JSON.parse(userString) as UserType;
  }
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
