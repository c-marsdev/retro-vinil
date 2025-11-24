import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/AppContextCart";

const Carrito = () => {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total } =
    useCartContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          {carrito.map((producto) => (
            <div key={producto.id}>
              <img
                src={producto.image}
                alt={producto.title}
                height={80}
                width={80}
              />
              <div>
                {producto.title} : ${Number(producto.price).toFixed(3)}
                (Cantidad: {Number(producto.cantidad) || 1})
                <button
                  className="btn"
                  onClick={() => quitarCantidad(producto.id)}
                >
                  -
                </button>
                <button
                  className="btn"
                  onClick={() => agregarCantidad(producto.id)}
                >
                  +
                </button>
              </div>
              <p>
                {producto.title} : ${producto.price}
              </p>
              <button className="btn" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
              <button className="btn" onClick={irAPagar}>
                Pagar
              </button>
            </div>
          ))}
          <p>Total: ${Number(total).toFixed(3)}</p>
        </>
      )}
    </div>
  );
};
export default Carrito;
