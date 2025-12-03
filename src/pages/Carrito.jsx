import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/AppContextCart";

const Carrito = () => {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total } =
    useCartContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div>
      <h1 className="w-screen text-center font-archivo-black font-extrabold text-3xl m-4 p-2">
        Carrito de Compras
      </h1>
      {carrito.length === 0 ? (
        <h3>Carrito vacío</h3>
      ) : (
        <>
          <section>
            <div className="container px-6 m-auto">
              <div className="flex justify-center flex-wrap">
                <div className="w-4/5 ">
                  {carrito.map((producto) => (
                    <ul
                      key={producto.id}
                      className="divide-y sm:divide-y-0  divide-slate-100 border-2 border-gray-900 my-4 rounded-sm font-space-grotesk w-auto"
                    >
                      <li className="flex items-center gap-4 px-4 py-3">
                        <div className="flex items-center self-center shrink-0">
                          <img
                            src={producto.foto}
                            alt={producto.titulo}
                            className="w-24 rounded"
                          />
                        </div>
                        <div className="flex flex-col gap-1 min-h-[2rem] items-start justify-center flex-1 min-w-2">
                          <label
                            className="w-full truncate cursor-pointer text-gray-900 font-semibold text-lg"
                            htmlFor="id-c13a"
                          >
                            {producto.titulo}
                          </label>
                          <p className="w-full text-sm text-slate-500">
                            Artista: {producto.artista} <br />
                            Precio: ${producto.precio}
                          </p>
                        </div>
                        <div className="flex items-center self-center justify-center">
                          <div className="relative flex flex-wrap items-center mx-2">
                            <div className="inline-flex overflow-hidden rounded">
                              <button
                                onClick={() => quitarCantidad(producto.id)}
                                className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-secondary-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-secondary-600 focus:bg-secondary-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                              >
                                <span>-</span>
                              </button>
                              <button
                                className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-secondary-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-secondary-600 focus:bg-secondary-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                                disabled
                              >
                                <span>{Number(producto.cantidad) || 1}</span>
                              </button>
                              <button
                                onClick={() => agregarCantidad(producto.id)}
                                className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-secondary-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-secondary-600 focus:bg-secondary-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                              >
                                <span>+</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                  <div className="border-t-2 border-gray-700 font-space-grotesk text-xl flex justify-center my-4">
                    <h3 className="mt-2">Total: ${Number(total).toFixed(2)}</h3>
                  </div>
                  <div className="flex justify-center my-2">
                    <button
                      className="h-10 w-full inline-flex items-center mr-4 justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                      onClick={vaciarCarrito}
                    >
                      Vaciar Carrito
                    </button>
                    <button
                      className="h-10 w-full inline-flex items-center justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-primary-500 shadow-gray-300 hover:bg-gray-900 hover:shadow-sm hover:shadow-primary-200 focus:bg-gray-900 focus:shadow-sm focus:shadow-gray-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                      onClick={irAPagar}
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
export default Carrito;
