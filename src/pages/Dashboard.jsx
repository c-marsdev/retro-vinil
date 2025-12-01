import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import { useProductosContext } from "../context/AppContextProductos";
import ListaProductos from "../components/ListaProductos";
import ModalFormulario from "../components/ModalFormulario";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuthContext();
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
          <div className="col-span-4 lg:col-span-6 sm:flex sm:justify-center md:justify-center lg:justify-center">
            {" "}
            <h1 className="font-archivo-black font-extrabold text-3xl">
              Gestión de Producto
            </h1>
          </div>
          <div className="col-span-4 lg:col-span-6 flex justify-center">
            <ModalFormulario
              id="agregar"
              nombre="agregar"
              boton="agregar"
              productoInicial={productoSeleccionado || {}}
              modo={modoFormulario}
            />
            {/* <Tooltip
              id="agregar"
              titulo="Agregar producto"
              boton={<Agregar setMostrarForm={setMostrarForm} />}
            /> */}
          </div>
          <div className="col-span-4 lg:col-span-12  xs:justify-center sm:justify-center md:justify-center lg:justify-start">
            <div className="md:w-2xl lg:w-2xl">
              {productos.map((producto) => (
                <ListaProductos key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p>
        <strong>Sesión iniciada como: </strong> {usuario.nombre}
      </p>

      {/* SECCIÓN DEL TOKEN */}
      <div>
        <strong>Token de autenticación:</strong>
        <br />
        <code>{tokenActual}</code>
      </div>

      {/* SECCIÓN DE ACCIONES ADMIN */}
      <div>
        <h3>Acciones:</h3>
        <div>
          <Link to="/productos">Ver Todos los Productos</Link>
        </div>
      </div>
      <hr></hr>

      {/* BOTÓN CERRAR SESIÓN */}
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </>
  );
};

export default Dashboard;
