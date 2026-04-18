import { Navigate } from "react-router-dom";
import { detectInitialLocale } from "../utils/locale";

export default function RootRedirect() {
  const locale = detectInitialLocale();
  return <Navigate to={`/${locale}`} replace />;
}