import type { AppLocale } from "./locale";
import { isValidLocale } from "./locale";

export function withLocalePath(path: string, locale: AppLocale) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  const parts = path.split("/").filter(Boolean);

  if (parts.length > 0 && isValidLocale(parts[0])) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}