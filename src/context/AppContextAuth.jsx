import { createContext, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();
// Hook personalizado
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}
