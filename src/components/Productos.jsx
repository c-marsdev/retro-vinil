import { useState, useEffect } from "react";
import Card from "./Card";
import Carrito from "./Carrito";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const URL =
    "https://69174d4aa7a34288a2804bba.mockapi.io/api-retrovil/v1/producto";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())

      .then((datos) => {
        // console.info(datos);
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error al cargar los productos");
        setCargando(false);
      });
  }, []);

  if (cargando) return "Cargando productos...";
  if (error) return <p>{error}</p>;

  return (
    <>
      {productos.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
      <Carrito />
    </>
  );
};
export default Productos;
