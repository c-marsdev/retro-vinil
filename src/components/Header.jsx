import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import { useCartContext } from "../context/AppContextCart";
import { useState } from "react";
import Carrito from "../assets/Carrito";
import Admin from "../assets/Admin";
import User from "../assets/User";

const Header = () => {
  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
  const { carrito } = useCartContext();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  console.info(usuario);
  console.info(carrito);
  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className=" relative z-20 w-full border-b-2 border-gray-700  bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:backdrop-blur-sm lg:after:hidden md:border-b-2 md: border-gray-700 font-archivo-black  ">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              id="RetroVil"
              aria-label="RetroVil logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="javascript:void(0)"
              to="/"
            >
              <img src="./src/assets/logo.png" alt="logo" width="60px" />
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-primary-500 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-stone-900 transition-colors duration-300 hover:text-primary-500 focus:text-secondary-500 focus:outline-none focus-visible:outline-none 
                   lg:px-8"
                  to="/"
                >
                  <span>Inicio</span>
                </Link>
              </li>
              <li
                role="none"
                className="flex items-stretch focus:border-b-stone-900 focus:border-2"
              >
                <Link
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-stone-900 transition-colors duration-300 hover:text-primary-500 focus:text-secondary-500 focus:outline-none focus-visible:outline-none 
                   lg:px-8"
                  to="/productos"
                >
                  <span>Productros</span>
                </Link>
              </li>
              <li>
                <Link className="" to={`/productos/:id`}></Link>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Pricing</span>
                </a>
              </li>
              <li role="none" className="flex items-stretch">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>About</span>
                </a>
              </li>
              <li></li>
            </ul>
            <div class="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
              <div className="mx-4  px-2">
                <Carrito />
              </div>
              <div className="mx-2  px-2 ">
                {isAuthenticated &&
                  (usuario.nombre === "admin" ? <Admin /> : <User />)}
              </div>
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={cerrarSesion}
                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-secondary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-2 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                  >
                    <Link className="" to="/iniciar-sesion">
                      Cerrar Sesión
                    </Link>
                  </button>
                </div>
              ) : (
                <button className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-primary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-primary-500 focus:shadow-sm focus:shadow-primary-200 focus:border-gray-900 focus:border-2 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none">
                  <Link className="" to="/iniciar-sesion">
                    Iniciar Sesión
                  </Link>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
