import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AppContextAuth";

const IniciarSesion = () => {
  const { iniciarSesion } = useAuthContext();

  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Verificar credenciales (admin/1234@admin)
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin");
      navigate("/dashboard");
    }
    // Lógica para usuarios normales - SOLO si NO es admin
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
      // Guarda el email ingresado y pasa nombre para el token user
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };

  return (
    <div className="m-4">
      <form
        onSubmit={manejarEnvio}
        className="m-8 mx-auto overflow-hidden rounded border-2 border-gray-700 bg-white text-gray-900 shadow-md shadow-slate-200 w-full max-w-3xl"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium font-archivo-black text-gray-900">
              Inicia sesión para continuar
            </h3>
          </header>
          <div className="flex flex-col space-y-8">
            <div className="relative my-6">
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Nombre"
                pattern=".{3,}"
                value={formulario.nombre}
                className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500  focus:border-emerald-500  valid:text-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                onChange={(e) =>
                  setFormulario({ ...formulario, nombre: e.target.value })
                }
                required
                // onChange={handleChange}
                // disabled={cargando}
                // aria-invalid={!!errores.nombre}
              />
              <label
                htmlFor="nombre"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
              >
                Nombre <small className="text-pink-500">*</small>
              </label>
              {/* <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.nombre ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el título del albúm
                </span>
              ) : (
                <span className="text-pink-500">{errores.nombre}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small> */}
            </div>
            <div className="relative my-6">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                pattern=".{3,}"
                value={formulario.email}
                className="peer relative h-12 w-full border-b-2 border-gray-700 px-4 font-space-grotesk text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500  focus:border-emerald-500  valid:text-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-gray-900"
                onChange={(e) =>
                  setFormulario({ ...formulario, email: e.target.value })
                }
                required
                // onChange={handleChange}
                // disabled={cargando}
                // aria-invalid={!!errores.email}
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs font-space-grotesk font-medium text-gray-900 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-gray-900 peer-disabled:before:bg-transparent"
              >
                E-mail <small className="text-pink-500">*</small>
              </label>
              {/* <small className="absolute flex w-full justify-between  px-4 py-1 text-xs text-gray-900 font-rubik transition peer-invalid:text-pink-500 peer-valid:text-emerald-500">
              {!errores.email ? (
                <span className="peer text-slate-500 peer-valid:text-shadow-emerald-500">
                  Ingrese el título del albúm
                </span>
              ) : (
                <span className="text-pink-500">{errores.email}</span>
              )}
              <span className="text-slate-500">1/10</span>
            </small> */}
            </div>
          </div>
        </div>
        <div className="flex justify-center p-6 ">
          <button
            className="h-10 w-full inline-flex items-center justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-primary-500 shadow-gray-300 hover:bg-gray-900 hover:shadow-sm hover:shadow-primary-200 focus:bg-gray-900 focus:shadow-sm focus:shadow-gray-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
            type="submit"
          >
            Iniciar Sesión
          </button>
          <button
            className="h-10 w-full inline-flex mx-4 items-center justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
            type="button"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <strong>Credenciales de prueba para Dashboard:</strong>
        <br />
        Nombre: admin
        <br />
        Email: 1234@admin
      </p>
    </div>
  );
};

export default IniciarSesion;
