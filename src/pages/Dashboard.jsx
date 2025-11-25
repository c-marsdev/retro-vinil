import React from "react";

import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import Agregar from "../assets/Agregar";
import Tooltip from "../components/Tooltip";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuthContext();

  // Obtener el token actual
  const tokenActual = localStorage.getItem("authToken");

  return (
    <>
      <div class="container px-2 m-auto items-center">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12   m-4">
          <div class="col-span-4 lg:col-span-6 sm:flex sm:justify-center md:justify-start lg:justify-start">
            {" "}
            <h1 className="font-archivo-black font-extrabold text-3xl">
              Gestión de Producto
            </h1>
          </div>
          <div className="col-span-4 lg:col-span-6 flex justify-center">
            <Tooltip
              id="agregar"
              titulo="Agregar producto"
              boton={<Agregar />}
            />
          </div>
        </div>
      </div>

      <div class="container px-2 m-auto items-center">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div class="col-span-4 md:col-span-8 lg:col-span-12">
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
                <button>
                  <Link to="/agregar-producto">Agregar Nuevo Producto</Link>
                </button>

                <Link to="/productos">Ver Todos los Productos</Link>
              </div>
            </div>
            <hr></hr>

            {/* BOTÓN CERRAR SESIÓN */}
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
