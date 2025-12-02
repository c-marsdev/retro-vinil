import { useProductosContext } from "../context/AppContextProductos";
import Card from "./Card";
import Carrito from "../pages/Carrito";

const Productos = () => {
  const { productos, cargando, error } = useProductosContext();

  console.log(cargando);
  console.error(error);
  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {productos.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
    </>
  );
};
export default Productos;
