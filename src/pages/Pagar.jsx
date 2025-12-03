import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import { useCartContext } from "../context/AppContextCart";
import Card from "../components/Card";

const Pagar = () => {
  const { isAuthenticated, setIsAuthenticated, usuario, setUsuario } =
    useAuthContext();
  const { total, vaciarCarrito } = useCartContext();
  const location = useLocation();

  const navigate = useNavigate();

  // Datos del carrito
  const carrito = location.state?.carrito || [];

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  // Función para cerrar sesión

  return (
    <div className="m-4">
      <div>
        <h1 className="w-screen text-center font-archivo-black font-extrabold text-3xl m-4 p-2">
          Tu compra:
        </h1>
        <section>
          <div className="container px-6 m-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              {carrito.map((producto) => (
                <div key={producto.id} className="col-span-4">
                  <Card modo="carrito" key={producto.id} producto={producto} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="border-t-2 border-gray-700 font-space-grotesk text-xl flex justify-center my-4">
          <h3 className="mt-2">Total a pagar: ${Number(total).toFixed(2)}</h3>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="h-10 w-full inline-flex items-center mr-4 justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-primary-500 shadow-gray-300 hover:bg-gray-900 hover:shadow-sm hover:shadow-primary-200 focus:bg-gray-900 focus:shadow-sm focus:shadow-gray-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
          onClick={comprar}
        >
          Confirmar y Pagar
        </button>
        <button
          className="h-10 w-full inline-flex items-center  justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
          onClick={() => navigate("/productos")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default Pagar;
