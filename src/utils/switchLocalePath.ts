import { AppLocale, isValidLocale } from "./locale";

export function switchLocalePath(pathname: string, newLocale: AppLocale) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${newLocale}`;
  }

  if (isValidLocale(parts[0])) {
    parts[0] = newLocale;
    return `/${parts.join("/")}`;
  }

  return `/${newLocale}/${parts.join("/")}`;
}