import { useState } from "react";
import { CartContext } from "./AppContextCart";

const CartProvider = ({ children }) => {
  //Carrito
  const [carrito, setCarrito] = useState([]);

  const agregarCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (Number(item.cantidad) || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
    alert(`Producto ${producto.titulo} agregado.`);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((item) => item.id !== productoId));
  };

  const quitarCantidad = (idProducto) => {
    const carritoActualizado = carrito
      .map((producto) => {
        if (producto.id === idProducto) {
          const cantidadActual = producto.cantidad || 1;
          if (cantidadActual === 1) {
            return null;
          }
          return { ...producto, cantidad: cantidadActual - 1 };
        }
        return producto;
      })
      .filter((producto) => producto !== null);

    setCarrito(carritoActualizado);
  };

  const agregarCantidad = (idProducto) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === idProducto) {
        return {
          ...producto,
          cantidad: (producto.cantidad || 1) + 1,
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => {
    const cantidad = Number(item.cantidad) || 1;
    return (
      sum + Number(item.precio.replace(/\./g, "").replace(",", ".")) * cantidad
    );
  }, 0);

  const value = {
    // Carrito
    carrito,
    agregarCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    setCarrito,

    agregarCantidad,
    quitarCantidad,

    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default CartProvider;
