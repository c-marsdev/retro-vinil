import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AppContextAuth";
import { useCartContext } from "../context/AppContextCart";

const Pagar = () => {
  const { isAuthenticated, setIsAuthenticated, usuario, setUsuario } =
    useAuthContext();
  const { vaciarCarrito } = useCartContext();
  const location = useLocation();

  const navigate = useNavigate();

  // Datos del carrito
  const carrito = location.state?.carrito || [];
  // Calculo del total
  const total = carrito.reduce(
    (suma, producto) => suma + Number(producto.precio),
    0
  );

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
  };

  return (
    <div>
      <div>
        <h2>{usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      <div>
        <h2>Tu compra:</h2>

        {carrito.map((producto) => (
          <div key={producto.id}>
            <img src={producto.foto} alt={producto.titulo} />
            <span>{producto.titulo}</span>
            <strong>${producto.precio}</strong>
          </div>
        ))}

        <h3>Total a pagar: ${total}</h3>
      </div>

      <div>
        <button onClick={comprar}>Confirmar y Pagar</button>
        <button onClick={() => navigate("/productos")}>Cancelar</button>
      </div>
    </div>
  );
};
export default Pagar;
