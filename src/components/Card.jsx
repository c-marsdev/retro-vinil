import { Link } from "react-router-dom";
import { useCartContext } from "../context/AppContextCart";

const Card = ({ modo, producto }) => {
  const { id, titulo, precio, foto, artista, moneda } = producto;
  const { agregarCarrito } = useCartContext();

  if (!id || !titulo || !precio) {
    return <p>Datos incompletos del producto</p>;
  }

  console.log(titulo);
  return (
    <>
      {/*<!-- Component: E-commerce card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 border-2 border-gray-900">
        {/*  <!-- Image --> */}
        <figure>
          <img src={foto} alt={titulo} className=" w-full" />
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 font-space-grotesk">
              {titulo}
            </h3>
            <h6 className="font-public-sans font-medium text-primary-600">
              {artista}
            </h6>
            <p className="font-nunito font-semibold text-secondary-500">
              {`${moneda} $${precio}`}
            </p>
          </header>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 pt-0">
          {modo === "producto" ? (
            <>
              <button
                className="h-10 w-full mr-4 inline-flex items-center justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-primary-500 shadow-gray-300 hover:bg-gray-900 hover:shadow-sm hover:shadow-primary-200  focus:shadow-sm focus:shadow-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                onClick={() => agregarCarrito(producto)}
              >
                <span>Comprar</span>
              </button>
              <Link to={`/productos/${id}`} state={{ producto }}>
                <button
                  className="h-10 w-full inline-flex items-center  justify-center gap-2 px-5 text-sm font-space-grotesk font-semibold tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-gray-900 shadow-gray-300 hover:bg-secondary-500 hover:shadow-sm hover:shadow-primary-200 focus:bg-secondary-500 focus:shadow-sm focus:shadow-secondary-200 focus:border-gray-900 focus:border-1 focus:text-gray-900 disabled:cursor-not-allowed disabled:border-secondary-300 disabled:bg-secondary-300 disabled:shadow-none"
                  type="button"
                >
                  Ver más
                </button>
              </Link>
            </>
          ) : (
            <div className="m-0 p-0"></div>
          )}
        </div>
      </div>
    </>
  );
};
export default Card;
