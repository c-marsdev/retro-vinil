import { useCartContext } from "../context/AppContextCart";

const CardMenuCarrito = () => {
  const { carrito, agregarCarrito } = useCartContext();
  console.log(carrito);
  const total = carrito.reduce((sum, item) => sum + Number(item.price), 0);
  total.toFixed(3);
  return (
    <div className="card-body">
      <span className="text-lg font-bold">
        {carrito.length !== 0 ? `Items: ${carrito.length}` : `Carrito Vacío`}
      </span>
      <span className="text-info">{`Total: ${total}`}</span>
      <div className="card-actions">
        <button className="btn btn-primary btn-block">Ver</button>
      </div>
    </div>
  );
};
export default CardMenuCarrito;
