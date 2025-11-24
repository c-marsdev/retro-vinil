import React from "react";

import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuthContext();

  // Obtener el token actual
  const tokenActual = localStorage.getItem("authToken");

  return (
    <div>
      <h1>Dashboard Administrativo</h1>
      <div>
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
  );
};

export default Dashboard;
