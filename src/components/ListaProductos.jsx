import Editar from "../assets/Editar";

import Detalle from "../assets/Detalle";
import Tooltip from "./Tooltip";
import EliminarProducto from "../pages/EliminarProducto";

const ListaProductos = ({ producto, onDetalle, onEditar }) => {
  const { id, titulo, precio, foto, artista } = producto;

  if (!id || !titulo || !precio) {
    return <p>Datos incompletos del producto</p>;
  }

  return (
    <>
      <ul className="divide-y divide-slate-100 border-2 border-gray-900 my-2 rounded-sm font-space-grotesk w-auto">
        <li className="flex items-center gap-4 px-4 py-3">
          <div className="flex items-center self-center shrink-0">
            <img src={foto} alt="product image" className="w-24 rounded" />
          </div>
          <div className="flex flex-col gap-1 min-h-[2rem] items-start justify-center flex-1 min-w-2">
            <label
              className="w-full truncate cursor-pointer text-gray-900 font-semibold text-lg"
              htmlFor="id-c13a"
            >
              {titulo}
            </label>
            <p className="w-full text-sm text-slate-500">
              Artista: {artista} <br />
              Precio: {precio}
            </p>
          </div>
          <div className="flex items-center self-center">
            <div className="relative flex flex-wrap items-center mx-2">
              <button onClick={onDetalle}>
                <Tooltip
                  id="detalle"
                  titulo="Detalle producto"
                  boton={<Detalle />}
                />
              </button>
            </div>
            <div className="relative flex flex-wrap items-center mx-2">
              <button onClick={onEditar}>
                <Tooltip
                  id="detalle"
                  titulo="Editar producto"
                  boton={<Editar />}
                />
              </button>
            </div>
            <div className="relative flex flex-wrap items-center mx-2">
              <button>
                <EliminarProducto key={producto.id} producto={producto} />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
export default ListaProductos;
