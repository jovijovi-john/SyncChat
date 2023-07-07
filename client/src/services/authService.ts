import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "token";
const COOKIE_EXPIRATION_DAYS = 7; // tempo de disponibilidade do cookie

export function setAuthToken(token: string): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS);
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: expirationDate });
}

export function getAuthToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE_NAME);
}

export function removeAuthToken(): void {
  Cookies.remove(TOKEN_COOKIE_NAME);
}
