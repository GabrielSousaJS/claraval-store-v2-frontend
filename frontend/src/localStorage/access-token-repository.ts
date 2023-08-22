import { TOKEN_KEY } from "../utils/system";

export function saveAuthData(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthData(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
}
