import { createContext, useContext } from "react";

// Crear el contexto
export const CartContext = createContext();

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}
