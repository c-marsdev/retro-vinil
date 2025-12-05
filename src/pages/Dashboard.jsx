import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import { useProductosContext } from "../context/AppContextProductos";
import ListaProductos from "../components/ListaProductos";
import Agregar from "../assets/Agregar";
import Tooltip from "../components/Tooltip";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();

  //Manejadores
  const handleAgregarProducto = () => {
    navigate("/formulario-producto");
  };

  const handleEditar = (producto) => {
    // Navegar al formulario de edición
    navigate("/formulario-producto", { state: { producto } });
  };

  const handleDetalle = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate(`/productos/${producto.id}`, { state: { producto } });
  };
  // Obtener el token actual
  const tokenActual = localStorage.getItem("authToken");
  // Cargando contexto de producto
  const { productos, cargando, error } = useProductosContext();

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container px-2 m-auto items-center">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 m-4">
          <div className="col-span-4 lg:col-span-6 flex justify-center ">
            {" "}
            <h1 className="text-center font-archivo-black font-extrabold text-3xl">
              Gestión de Producto
            </h1>
          </div>
          <div className="col-span-4 lg:col-span-6 flex md:justify-start max-sm:justify-center  max-[500px]:w-full">
            <button onClick={handleAgregarProducto}>
              <Tooltip
                id="agregar"
                titulo="Agregar producto"
                boton={<Agregar />}
              />
            </button>
          </div>
          <div className="col-span-4 lg:col-span-12  xs:justify-center sm:justify-center md:justify-center lg:justify-start">
            <div className="md:w-2xl lg:w-2xl">
              {productos.map((producto) => (
                <ListaProductos
                  key={producto.id}
                  producto={producto}
                  onEditar={() => handleEditar(producto)}
                  onDetalle={() => handleDetalle(producto)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p>
        <strong className="font-space-grotesk">Sesión iniciada como: </strong>{" "}
        {usuario.nombre}
      </p>
    </>
  );
};

export default Dashboard;
