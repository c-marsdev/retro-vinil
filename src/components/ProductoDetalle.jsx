import { Link, useLocation, useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto = location.state?.producto;
  if (!producto) {
    return (
      <>
        <p>No se encuentra el producto seleccionado</p>
        <Link to={"/productos"}>
          <button>Volver atrás</button>
        </Link>
      </>
    );
  }
  return (
    <>
      <h2>Detalles del Producto {id}</h2>
      <div
        key={producto.id}
        className="border-2 rounded-xl m-2 flex flex-wrap justify-center"
      >
        <img src={producto.image} alt="Imagen del producto" width="55%" />
        <h2>{producto.title}</h2>
        <p> $ {producto.price}</p>
        <p>{producto.category}</p>
        <p>{producto.rating.rate}</p>
        <p className="text-start">{producto.description}</p>
        <Link to={`/productos`}>
          <button type="button">Volver</button>
        </Link>
      </div>
    </>
  );
};
export default ProductoDetalle;
