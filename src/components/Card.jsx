import { Link } from "react-router-dom";
import { useCartContext } from "../context/AppContextCart";

const Card = ({ producto }) => {
  const { id, titulo, precio, image } = producto;
  const { agregarCarrito } = useCartContext();

  if (!id || !titulo || !precio) {
    return <p>Datos incompletos del producto</p>;
  }

  console.log(titulo);
  return (
    <>
      <div className="card bg-base-100 w-64 h-96 shadow-sm m-2 justify-between">
        <figure className="h-40 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt="Imagen del producto"
            className="h-full w-auto object-contain"
          />
        </figure>
        <div className="">
          <h2 className="">{titulo}</h2>
          <p> $ {precio}</p>
          <div className="">
            <button
              className=""
              type="button"
              onClick={() => agregarCarrito(producto)}
            >
              Comprar
            </button>
            <Link to={`/productos/${id}`} state={{ producto }}>
              <button className="" type="button">
                Ver más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
