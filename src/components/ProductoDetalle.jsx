import { Link, useLocation } from "react-router-dom";
import Tabs from "./Tabs";

const ProductoDetalle = () => {
  const location = useLocation();
  const producto = location.state?.producto;
  if (!producto) {
    return (
      <>
        <p>No se encuentra el producto seleccionado</p>
        <Link to={"/productos"}>
          <button>Volver atrás</button>
        </Link>
      </>
    );
  }
  return (
    <>
      <h1 className="w-screen text-center font-archivo-black font-extrabold text-3xl max-[395px]:text-xl m-4 p-2">
        Detalles del Producto
      </h1>
      <section>
        <div className="container px-6 m-auto h-full justify-center">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mb-4">
            <div className="col-span-4 lg:col-span-5">
              <img
                src={producto.foto}
                alt="Imagen del producto"
                width="w-full"
              />
            </div>
            <div className="col-span-4 lg:col-span-7">
              <header className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk">
                  {producto.titulo}
                </h2>
                <h5 className="text-xl font-public-sans font-medium text-primary-600">
                  {producto.artista}
                </h5>
                <p className="text-lg font-nunito font-semibold text-secondary-500">
                  {`${producto.moneda} $${producto.precio}`}
                </p>
              </header>
              <div key={producto.id} className="">
                <p className="font-nunito text-lg">
                  <strong>Género: </strong> {producto.genero}
                </p>
                <p className="font-nunito text-lg">
                  <strong>N° Catálogo: </strong> {producto.numCatalogo}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Formato: </strong> {producto.formato}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Velocidad: </strong> {producto.velocidad}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Cantidad de discos: </strong> {producto.cdadDiscos}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Edición: </strong> {producto.edicion}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Edición especial: </strong> {producto.edicionEspecial}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Duración total: </strong> {producto.duracionTotal}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Condición del vinilo: </strong>{" "}
                  {producto.condicionVinil}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Condición de la funda: </strong>{" "}
                  {producto.numCatalogo}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Extras: </strong> {producto.condicionFunda}
                </p>
                <p className="font-nunito text-lg">
                  <strong>Origen: </strong> {producto.origen}
                </p>
                <p className="font-nunito text-lg">
                  <strong>País: </strong> {producto.pais}
                </p>
                <Link to={`/productos`}>
                  <button
                    type="button"
                    className="h-10 w-full my-2 inline-flex items-center justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-primary-500 shadow-gray-300 hover:bg-gray-900 hover:shadow-sm hover:shadow-primary-200  focus:shadow-sm focus:shadow-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                  >
                    Volver
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Tabs producto={producto} />
        </div>
      </section>
    </>
  );
};
export default ProductoDetalle;
