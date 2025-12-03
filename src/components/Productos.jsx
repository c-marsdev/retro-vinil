import { useProductosContext } from "../context/AppContextProductos";
import Card from "./Card";
import Carrito from "../pages/Carrito";
import Cargando from "./Cargando";

const Productos = () => {
  const { productos, cargando, error } = useProductosContext();

  console.log(cargando);
  console.error(error);
  if (cargando)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Cargando />
      </div>
    );
  if (error) return <p>{error}</p>;
  return (
    <>
      <section>
        <div className="container px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            {productos.map((producto) => (
              <div key={producto.id} className="col-span-4">
                {" "}
                <Card
                  modo="producto"
                  key={producto.id}
                  producto={producto}
                />{" "}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Productos;
