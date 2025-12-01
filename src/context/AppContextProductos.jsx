import { createContext, useContext } from "react";

export const ProductosContext = createContext();

export function useProductosContext() {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error(
      "useProductosContext debe ser usado dentro de un ProductosProvider"
    );
  }
  return context;
}
